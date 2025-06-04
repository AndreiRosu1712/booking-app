package com.example.Project_IP.controller;

import com.example.Project_IP.model.Hotel;
import com.example.Project_IP.service.HotelService;
import com.example.Project_IP.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "*")
public class ManagerController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private UserService userService;

    @GetMapping("/{idManager}/hotels")
    public ResponseEntity<List<Hotel>> getManagerHotels(@PathVariable String idManager) {
        List<Hotel> hotels = hotelService.getHotelsByManagerId(idManager);
        return ResponseEntity.ok(hotels);
    }

    @PostMapping("/{idManager}/hotels")
    public ResponseEntity<Hotel> addHotel(@PathVariable String idManager, @RequestBody Hotel hotel) {
        hotel.setIdManager(idManager);
        Hotel createdHotel = hotelService.createHotel(hotel);
        return ResponseEntity.ok(createdHotel);
    }

    @PutMapping("/{idManager}/hotels/{hotelId}")
    public ResponseEntity<Hotel> updateHotel(
            @PathVariable String idManager,
            @PathVariable String hotelId,
            @RequestBody Hotel hotelDetails) {
        // Verificăm dacă hotelul aparține managerului
        Hotel existingHotel = hotelService.getHotelById(hotelId);
        if (!existingHotel.getIdManager().equals(idManager)) {
            return ResponseEntity.badRequest().build();
        }

        hotelDetails.setIdManager(idManager);
        Hotel updatedHotel = hotelService.updateHotel(hotelId, hotelDetails);
        return ResponseEntity.ok(updatedHotel);
    }

    @DeleteMapping("/{idManager}/hotels/{hotelId}")
    public ResponseEntity<?> deleteHotel(
            @PathVariable String idManager,
            @PathVariable String hotelId) {
        // Verificăm dacă hotelul aparține managerului
        Hotel existingHotel = hotelService.getHotelById(hotelId);
        if (!existingHotel.getIdManager().equals(idManager)) {
            return ResponseEntity.badRequest().build();
        }

        hotelService.deleteHotel(hotelId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{idManager}/hotels/{hotelId}")
    public ResponseEntity<Hotel> getHotelDetails(
            @PathVariable String idManager,
            @PathVariable String hotelId) {
        // Verificăm dacă hotelul aparține managerului
        Hotel hotel = hotelService.getHotelById(hotelId);
        if (!hotel.getIdManager().equals(idManager)) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(hotel);
    }
}