package com.freelancebidding.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.freelancebidding.model.Project;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByEmployerEmail(String employerEmail);
    List<Project> findByAssignedFreelancer(String freelancerEmail);

}
