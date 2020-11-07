package com.qttd.repositories;

import com.qttd.entities.AccountRoleEntity;
import com.qttd.enums.AccountRole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRoleRepository extends CrudRepository<AccountRoleEntity, Long> {
    AccountRoleEntity findByRole(AccountRole role);
}
