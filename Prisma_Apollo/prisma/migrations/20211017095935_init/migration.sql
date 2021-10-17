-- AddForeignKey
ALTER TABLE `Role_has_User` ADD CONSTRAINT `Role_has_User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
