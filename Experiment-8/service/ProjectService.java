package com.freelancebidding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancebidding.model.Project;
import com.freelancebidding.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByEmployer(String email) {
        return projectRepository.findByEmployerEmail(email);
    }

    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }

    public Project updateProject(String id, Project updatedProject) {
        return projectRepository.findById(id).map(project -> {
            project.setTitle(updatedProject.getTitle());
            project.setDescription(updatedProject.getDescription());
            project.setBudget(updatedProject.getBudget());
            project.setCategory(updatedProject.getCategory());
            project.setStatus(updatedProject.getStatus());
            return projectRepository.save(project);
        }).orElse(null);
    }

    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }

    public List<Project> getProjectsForFreelancer(String email) {
    return projectRepository.findAll().stream()
            .filter(p -> email.equalsIgnoreCase(p.getAssignedFreelancer()))
            .toList();
    }

}
