package com.freelancebidding.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
public class Project {
    @Id
    private String id;

    private String title;
    private String description;
    private double budget;
    private String category;
    private String employerEmail;  // The employer who posted the project
    private String status = "OPEN"; // OPEN, ASSIGNED, COMPLETED
    private String assignedFreelancer; // Freelancer assigned to the project

    // Constructors
    public Project() {}

    public Project(String title, String description, double budget, String category, String employerEmail) {
        this.title = title;
        this.description = description;
        this.budget = budget;
        this.category = category;
        this.employerEmail = employerEmail;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getBudget() { return budget; }
    public void setBudget(double budget) { this.budget = budget; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getEmployerEmail() { return employerEmail; }
    public void setEmployerEmail(String employerEmail) { this.employerEmail = employerEmail; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAssignedFreelancer() { return assignedFreelancer; }
    public void setAssignedFreelancer(String assignedFreelancer) { this.assignedFreelancer = assignedFreelancer; }
}
