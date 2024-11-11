#![cfg_attr(not(feature = "std"), no_std, no_main)]

// # ✒️ Challenge 2: Implement voter registration, proposal management, and voting in your Dao.
//
// - **Difficulty**: Mid
// - **Submission Criteria:** ink! contract must
//     - Use a storage-optimized data-structure `Mapping` or `StorageVec`
//     - Store registered members, member votes, and proposals to vote on.
//     - Implement methods to register and de-register members.
//     - Implement methods to create proposals and a method to vote on proposals.
//     - Unit tests for adding members, votes, and proposals.
// - **Submission Guidelines:**
//     - Verify with R0GUE DevRel, and post on X.
// - **Prize:** sub0 merch

#[ink::contract]
mod dao {
    use ink::prelude::string::String;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct Dao {
        name: String,
        members: Mapping<AccountId, bool>,
        proposals: Mapping<u32, Proposal>,
        proposal_count: u32,
    }

    #[derive(Default, Clone, Debug)]
    pub struct Proposal {
        description: String,
        votes_for: u32,
        votes_against: u32,
    }

    impl Dao {
        #[ink(constructor)]
        pub fn new(dao_name: String) -> Self {
            Self {
                name: dao_name,
                members: Mapping::default(),
                proposals: Mapping::default(),
                proposal_count: 0,
            }
        }

        #[ink(message)]
        pub fn register_member(&mut self, member: AccountId) {
            self.members.insert(member, &true);
        }

        #[ink(message)]
        pub fn deregister_member(&mut self, member: AccountId) {
            self.members.insert(member, &false);
        }

        #[ink(message)]
        pub fn create_proposal(&mut self, description: String) -> u32 {
            let proposal_id = self.proposal_count;
            let proposal = Proposal {
                description,
                votes_for: 0,
                votes_against: 0,
            };
            self.proposals.insert(proposal_id, &proposal);
            self.proposal_count += 1;
            proposal_id
        }

        #[ink(message)]
        pub fn vote(&mut self, proposal_id: u32, support: bool) {
            let proposal = self.proposals.get(proposal_id).expect("Proposal does not exist");
            if support {
                proposal.votes_for += 1;
            } else {
                proposal.votes_against += 1;
            }
            self.proposals.insert(proposal_id, &proposal);
        }

        #[ink(message)]
        pub fn get_proposal(&self, proposal_id: u32) -> Proposal {
            self.proposals.get(proposal_id).expect("Proposal does not exist")
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use ink::env::test;

        #[ink::test]
        fn test_register_member() {
            let mut dao = Dao::new(String::from("Test DAO"));
            let member = test::get_account_id(0);
            dao.register_member(member);
            assert!(dao.members.get(member).unwrap());
        }

        #[ink::test]
        fn test_create_proposal() {
            let mut dao = Dao::new(String::from("Test DAO"));
            let proposal_id = dao.create_proposal(String::from("Proposal 1"));
            let proposal = dao.get_proposal(proposal_id);
            assert_eq!(proposal.description, String::from("Proposal 1"));
        }
    }
}