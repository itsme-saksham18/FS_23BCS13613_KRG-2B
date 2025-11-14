package com.freelancebidding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancebidding.model.Bid;
import com.freelancebidding.model.Project;
import com.freelancebidding.repository.BidRepository;
import com.freelancebidding.repository.ProjectRepository;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Bid placeBid(Bid bid) {
        return bidRepository.save(bid);
    }

    public List<Bid> getBidsByProject(String projectId) {
        return bidRepository.findByProjectId(projectId);
    }

    public List<Bid> getBidsByFreelancer(String email) {
        return bidRepository.findByFreelancerEmail(email);
    }

    public Optional<Bid> getBidById(String id) {
        return bidRepository.findById(id);
    }

    // UPDATED: Accept or reject a bid and update project automatically
    public Bid updateBidStatus(String bidId, String status) {
        Optional<Bid> optionalBid = bidRepository.findById(bidId);
        if (optionalBid.isPresent()) {
            Bid bid = optionalBid.get();
            bid.setStatus(status);
            bidRepository.save(bid);

            // If ACCEPTED → update project and reject other bids
            if (status.equalsIgnoreCase("ACCEPTED")) {
                Optional<Project> projectOpt = projectRepository.findById(bid.getProjectId());
                if (projectOpt.isPresent()) {
                    Project project = projectOpt.get();
                    project.setStatus("ASSIGNED");
                    project.setAssignedFreelancer(bid.getFreelancerEmail());
                    projectRepository.save(project);

                    // Reject other bids for same project
                    List<Bid> allBids = bidRepository.findByProjectId(bid.getProjectId());
                    for (Bid b : allBids) {
                        if (!b.getId().equals(bidId)) {
                            b.setStatus("REJECTED");
                            bidRepository.save(b);
                        }
                    }
                }
            }
            return bid;
        }
        return null;
    }

    public void deleteBid(String id) {
        bidRepository.deleteById(id);
    }

    public List<Bid> getBidsForEmployer(String employerEmail) {
    // fetch projects by employer
    List<Project> employerProjects = projectRepository.findByEmployerEmail(employerEmail);

    // gather bids from those projects
    return employerProjects.stream()
            .flatMap(p -> bidRepository.findByProjectId(p.getId()).stream())
            .toList();
    }

}
