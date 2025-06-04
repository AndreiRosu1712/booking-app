package com.example.Project_IP.controller;

import com.example.Project_IP.model.Hotel;
import com.example.Project_IP.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")public class ManagerController {

    @Autowired
    private HotelService hotelService;

    @GetMapping("/{idManager}/hotels")
    public ResponseEntity<?> getManagerHotels(@PathVariable String idManager) {
        try {
            List<Hotel> hotels = hotelService.getHotelsByManagerId(idManager);
            return ResponseEntity.ok(hotels);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Eroare la listarea hotelurilor: " + e.getMessage());
        }
    }

    @PostMapping("/{idManager}/hotels")
    public ResponseEntity<?> addHotel(@PathVariable String idManager, @RequestBody Hotel hotel) {
        try {
            hotel.setIdManager(idManager);
            Hotel createdHotel = hotelService.createHotel(hotel);
            return ResponseEntity.ok(createdHotel);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Eroare la adăugarea hotelului: " + e.getMessage());
        }
    }

    @PutMapping("/{idManager}/hotels/{hotelId}")
    public ResponseEntity<?> updateHotel(
            @PathVariable String idManager,
            @PathVariable String hotelId,
            @RequestBody Hotel hotelDetails) {
        try {
            Hotel existingHotel = hotelService.getHotelById(hotelId);
            if (!existingHotel.getIdManager().equals(idManager)) {
                return ResponseEntity.badRequest().body("Hotelul nu aparține managerului!");
            }
            hotelDetails.setIdManager(idManager);
            Hotel updatedHotel = hotelService.updateHotel(hotelId, hotelDetails);
            return ResponseEntity.ok(updatedHotel);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Eroare la actualizarea hotelului: " + e.getMessage());
        }
    }

    @DeleteMapping("/{idManager}/hotels/{hotelId}")
    public ResponseEntity<?> deleteHotel(
            @PathVariable String idManager,
            @PathVariable String hotelId) {
        try {
            Hotel existingHotel = hotelService.getHotelById(hotelId);
            if (!existingHotel.getIdManager().equals(idManager)) {
                return ResponseEntity.badRequest().body("Hotelul nu aparține managerului!");
            }
            hotelService.deleteHotel(hotelId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Eroare la ștergerea hotelului: " + e.getMessage());
        }
    }

    @GetMapping("/{idManager}/hotels/{hotelId}")
    public ResponseEntity<?> getHotelDetails(
            @PathVariable String idManager,
            @PathVariable String hotelId) {
        try {
            Hotel hotel = hotelService.getHotelById(hotelId);
            if (!hotel.getIdManager().equals(idManager)) {
                return ResponseEntity.badRequest().body("Hotelul nu aparține managerului!");
            }
            return ResponseEntity.ok(hotel);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Eroare la obținerea detaliilor hotelului: " + e.getMessage());
        }
    }
}
