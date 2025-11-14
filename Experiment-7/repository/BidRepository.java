package com.freelancebidding.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.freelancebidding.model.Bid;

@Repository
public interface BidRepository extends MongoRepository<Bid, String> {
    List<Bid> findByProjectId(String projectId);
    List<Bid> findByFreelancerEmail(String freelancerEmail);
}
