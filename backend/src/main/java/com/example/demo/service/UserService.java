package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.UserDTO;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.InternalServerErrorException;
import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;

    public List<UserDTO> getAllUsers() {
        List<User> userList = userRepo.findAll();
        return modelMapper.map(userList, new TypeToken<List<UserDTO>>() {
        }.getType());
    }

    public UserDTO saveUser(UserDTO userDTO) {
        try {
            User savedUser = userRepo.save(modelMapper.map(userDTO, User.class));
            return modelMapper.map(savedUser, UserDTO.class);
        } catch (Exception e) {
            throw new BadRequestException("Failed to save user: " + e.getMessage());
        }
    }

    public UserDTO updateUser(UserDTO userDTO) {
        try {
            Optional<User> existingUser = userRepo.findById(userDTO.getId());
            if (existingUser.isPresent()) {
                User updatedUser = userRepo.save(modelMapper.map(userDTO, User.class));
                return modelMapper.map(updatedUser, UserDTO.class);
            } else {
                throw new ResourceNotFoundException("User not found with id: " + userDTO.getId());
            }
        } catch (Exception e) {
            throw new InternalServerErrorException("Failed to update user: " + e.getMessage());
        }
    }

    public String deleteUser(Integer userId) {
        try {
            if (userRepo.existsById(userId)) {
                userRepo.deleteById(userId);
                return "User deleted successfully";
            } else {
                throw new ResourceNotFoundException("User not found with id: " + userId);
            }
        } catch (Exception e) {
            throw new InternalServerErrorException("Failed to delete user: " + e.getMessage());
        }
    }

    public UserDTO getUserById(Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return modelMapper.map(user, UserDTO.class);
    }
}
