import { QueryInterface, DataTypes } from 'sequelize';

const permissionsData = [
  {
    name: 'admin',
    description: 'Administrator permissions',
    active: true,
  },
  {
    name: 'permission',
    description: 'Permissions management',
    active: true,
  },
  {
    name: 'roles',
    description: 'Roles management',
    active: true,
  },
  {
    name: 'franchise',
    description: 'Franchise permissions',
    active: true,
  },
  {
    name: 'customer',
    description: 'Customer permissions',
    active: true,
  },
  {
    name: 'testimonials',
    description: 'Testimonials permissions',
    active: true,
  },
  {
    name: 'reviews',
    description: 'Reviews permissions',
    active: true,
  },
  {
    name: 'menu',
    description: 'Menu permissions',
    active: true,
  },
  {
    name: 'lead',
    description: 'Lead permissions',
    active: true,
  },
  {
    name: 'followup',
    description: 'Follow-up permissions',
    active: true,
  },
];

const rolesData = [
  {
    name: 'AdminRole',
    description: 'Administrator role with full access',
    role_permissions: JSON.stringify({
      user: ['create', 'update', 'delete', 'read'],
      permission: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      franchise: ['create', 'read', 'update', 'delete'],
      customer: ['create', 'read', 'update', 'delete'],
      testimonials: ['create', 'read', 'update', 'delete'],
      reviews: ['create', 'read', 'update', 'delete'],
      menu: ['create', 'read', 'update', 'delete'],
      lead: ['create', 'read', 'update', 'delete'],
      followup: ['create', 'read', 'update', 'delete'],
    }),
    active: true,
  },
];

export const up = async (queryInterface: QueryInterface) => {
  try {
    console.log("Inserting permissions...");
    
    for (const permission of permissionsData) {
      const existingPermission = await queryInterface.rawSelect('admin_permissions', {
        where: { name: permission.name }
      }, ['id']);

      if (!existingPermission) {
        await queryInterface.bulkInsert('admin_permissions', [{
          name: permission.name,
          description: permission.description,
          active: permission.active,
          created_at: new Date(),
          updated_at: new Date(),
        }]);
        console.log(`Inserted permission: ${permission.name}`);
      } else {
        console.log(`Permission already exists: ${permission.name}`);
      }
    }
  } catch (error) {
    console.error("Error inserting permissions:", error);
  }

  try {
    console.log("Inserting roles...");

    for (const role of rolesData) {
      const existingRole = await queryInterface.rawSelect('admin_roles', {
        where: { name: role.name }
      }, ['id']);

      if (!existingRole) {
        await queryInterface.bulkInsert('admin_roles', [{
          name: role.name,
          description: role.description,
          role_permissions: role.role_permissions,
          active: role.active,
          created_at: new Date(),
          updated_at: new Date(),
        }]);
        console.log(`Inserted role: ${role.name}`);
      } else {
        console.log(`Role already exists: ${role.name}`);
      }
    }
  } catch (error) {
    console.error("Error inserting roles:", error);
  }
};

export const down = async (queryInterface: QueryInterface) => {
  console.log("Removing roles and permissions...");
  await queryInterface.bulkDelete('admin_roles', {}, {});
  await queryInterface.bulkDelete('admin_permissions', {}, {});
  console.log("Roles and permissions removed.");
};
