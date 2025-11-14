package com.freelancebidding.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bids")
public class Bid {

    @Id
    private String id;

    private String projectId;         // Project being bid on
    private String freelancerEmail;   // Freelancer placing the bid
    private double bidAmount;
    private String proposalText;
    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED

    public Bid() {}

    public Bid(String projectId, String freelancerEmail, double bidAmount, String proposalText) {
        this.projectId = projectId;
        this.freelancerEmail = freelancerEmail;
        this.bidAmount = bidAmount;
        this.proposalText = proposalText;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getFreelancerEmail() { return freelancerEmail; }
    public void setFreelancerEmail(String freelancerEmail) { this.freelancerEmail = freelancerEmail; }

    public double getBidAmount() { return bidAmount; }
    public void setBidAmount(double bidAmount) { this.bidAmount = bidAmount; }

    public String getProposalText() { return proposalText; }
    public void setProposalText(String proposalText) { this.proposalText = proposalText; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
