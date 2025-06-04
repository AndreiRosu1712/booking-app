package com.example.Project_IP.service;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

@Service
public class BookingService {

    public void saveBooking(Map<String, Object> data) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("bookigs").add(data).get();
    }

    public List<Map<String, Object>> getBookingsByClient(String idClient) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        List<Map<String, Object>> bookings = new ArrayList<>();

        db.collection("bookigs")
                .whereEqualTo("idClient", idClient)
                .get()
                .get()
                .getDocuments()
                .forEach(doc -> {
                    Map<String, Object> data = doc.getData();
                    data.put("id", doc.getId());

                    // Adaugă numele hotelului
                    String idHotel = (String) data.get("idHotel");
                    try {
                        DocumentSnapshot hotelDoc = db.collection("hotels").document(idHotel).get().get();
                        if (hotelDoc.exists()) {
                            data.put("numeHotel", hotelDoc.getString("nume"));
                        }
                    } catch (Exception e) {
                        System.err.println("Eroare la extragerea numelui hotelului: " + e.getMessage());
                    }

                    bookings.add(data);
                });

        return bookings;
    }

    public List<Map<String, Object>> getBookingsByHotel(String idHotel) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        List<Map<String, Object>> bookings = new ArrayList<>();

        db.collection("bookigs")
                .whereEqualTo("idHotel", idHotel)
                .get()
                .get()
                .getDocuments()
                .forEach(doc -> {
                    Map<String, Object> data = doc.getData();
                    data.put("id", doc.getId());

                    // Adaugă datele clientului
                    String idClient = (String) data.get("idClient");
                    try {
                        DocumentSnapshot userDoc = db.collection("users").document(idClient).get().get();
                        if (userDoc.exists()) {
                            data.put("numeClient", userDoc.getString("nume"));
                            data.put("prenumeClient", userDoc.getString("prenume"));
                            data.put("emailClient", userDoc.getString("email"));
                            data.put("telefonClient", userDoc.getString("telefon"));
                        }
                    } catch (Exception e) {
                        System.err.println("Eroare la extragerea datelor clientului: " + e.getMessage());
                    }

                    bookings.add(data);
                });

        return bookings;
    }
}
