package com.example.Project_IP.service;

import com.example.Project_IP.model.Hotel;
import com.example.Project_IP.model.User;
import com.example.Project_IP.repository.HotelRepository;
import com.example.Project_IP.repository.UserRepository;
import com.example.Project_IP.dto.RoomCountsDto;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Hotel> getAllHotels() {
        try {
            List<Hotel> hotels = hotelRepository.getAllHotels();
            Firestore db = FirestoreClient.getFirestore();

            for (Hotel hotel : hotels) {
                try {
                    DocumentSnapshot managerDoc = db.collection("users").document(hotel.getIdManager()).get().get();
                    if (managerDoc != null && managerDoc.exists()) {
                        String numeComplet = managerDoc.getString("nume") + " " + managerDoc.getString("prenume");
                        hotel.setNumeManager(numeComplet);
                    }
                } catch (ExecutionException | InterruptedException e) {
                    System.err.println("Error fetching manager details for hotel " + hotel.getId() + ": " + e.getMessage());
                    throw new RuntimeException("Failed to fetch manager details", e);
                }
            }
            return hotels;
        } catch (Exception e) {
            System.err.println("Error fetching all hotels: " + e.getMessage());
            throw new RuntimeException("Failed to retrieve all hotels", e);
        }
    }

    public Hotel getHotelById(String id) {
        try {
            Hotel hotel = hotelRepository.getHotelById(id);
            if (hotel == null) {
                throw new RuntimeException("Hotel not found");
            }
            Firestore db = FirestoreClient.getFirestore();
            try {
                DocumentSnapshot managerDoc = db.collection("users").document(hotel.getIdManager()).get().get();
                if (managerDoc != null && managerDoc.exists()) {
                    String numeComplet = managerDoc.getString("nume") + " " + managerDoc.getString("prenume");
                    hotel.setNumeManager(numeComplet);
                }
            } catch (ExecutionException | InterruptedException e) {
                System.err.println("Error fetching manager details for hotel " + hotel.getId() + ": " + e.getMessage());
                throw new RuntimeException("Failed to fetch manager details", e);
            }
            return hotel;
        } catch (Exception e) {
            System.err.println("Error fetching hotel by id " + id + ": " + e.getMessage());
            if (e.getMessage() != null && e.getMessage().contains("Hotelul nu există.")) {
                throw new RuntimeException("Hotel not found", e);
            } else {
                throw new RuntimeException("Failed to retrieve hotel", e);
            }
        }
    }

    public List<Hotel> getHotelsByManager(String idManager) {
        try {
            return hotelRepository.findHotelsByManagerId(idManager);
        } catch (Exception e) {
            System.err.println("Error fetching hotels by manager " + idManager + ": " + e.getMessage());
            throw new RuntimeException("Failed to retrieve hotels by manager", e);
        }
    }

    public List<Hotel> getHotelsByManagerId(String idManager) {
        try {
            User managerUser = userRepository.findById(idManager);
            if (managerUser == null || !"manager".equals(managerUser.getRol())) {
                throw new RuntimeException("Manager invalid");
            }

            return hotelRepository.findHotelsByManagerId(idManager);
        } catch (Exception e) {
            System.err.println("Error fetching hotels by manager id " + idManager + ": " + e.getMessage());
            throw new RuntimeException("Failed to retrieve hotels by manager id", e);
        }
    }

    public Hotel createHotel(Hotel hotel) {
        try {
            User managerUser = userRepository.findById(hotel.getIdManager());
            if (managerUser == null || !"manager".equals(managerUser.getRol())) {
                throw new RuntimeException("Manager invalid");
            }

            validateHotel(hotel);

            return hotelRepository.saveHotel(hotel);
        } catch (Exception e) {
            System.err.println("Error creating hotel: " + e.getMessage());
            throw new RuntimeException("Failed to create hotel", e);
        }
    }

    public Hotel updateHotel(String id, Hotel hotelDetails) {
        try {
            Hotel hotel = hotelRepository.getHotelById(id);
            if (hotel == null) {
                throw new RuntimeException("Hotel not found");
            }

            validateHotel(hotelDetails);

            hotel.setNume(hotelDetails.getNume());
            hotel.setLocatie(hotelDetails.getLocatie());
            hotel.setPretNoapte(hotelDetails.getPretNoapte());
            hotel.setDescriere(hotelDetails.getDescriere());
            hotel.setImagine(hotelDetails.getImagine());

            return hotelRepository.updateHotel(id, hotel);
        } catch (Exception e) {
            System.err.println("Error updating hotel " + id + ": " + e.getMessage());
            throw new RuntimeException("Failed to update hotel", e);
        }
    }

    public void deleteHotel(String id) {
        try {
            Hotel hotel = hotelRepository.getHotelById(id);
            if (hotel == null) {
                throw new RuntimeException("Hotel not found");
            }
            hotelRepository.deleteHotel(id);
        } catch (Exception e) {
            System.err.println("Error deleting hotel " + id + ": " + e.getMessage());
            throw new RuntimeException("Failed to delete hotel", e);
        }
    }

    public void updateHotelRoomCounts(String hotelId, RoomCountsDto roomCountsDto) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference hotelRef = db.collection("hotels").document(hotelId);

            Map<String, Object> updates = new HashMap<>();
            updates.put("singleRoomCount", roomCountsDto.getSingleRoomCount());
            updates.put("doubleRoomCount", roomCountsDto.getDoubleRoomCount());
            updates.put("tripleRoomCount", roomCountsDto.getTripleRoomCount());

            hotelRef.update(updates).get();
        } catch (ExecutionException | InterruptedException e) {
            System.err.println("Error updating room counts for hotel " + hotelId + ": " + e.getMessage());
            throw new RuntimeException("Failed to update room counts", e);
        }
    }

    private void validateHotel(Hotel hotel) {
        if (hotel.getNume() == null || hotel.getNume().trim().isEmpty()) {
            throw new RuntimeException("Numele hotelului este obligatoriu");
        }
        if (hotel.getLocatie() == null || hotel.getLocatie().trim().isEmpty()) {
            throw new RuntimeException("Locația hotelului este obligatorie");
        }
        if (hotel.getPretNoapte() == null || hotel.getPretNoapte() <= 0) {
            throw new RuntimeException("Prețul pe noapte trebuie să fie mai mare decât 0");
        }
    }
}
