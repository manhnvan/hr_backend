'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addConstraint('employee', {
        fields: ['role_id'],
        type: 'foreign key',
        name: 'employee_fk_role',
        references: { //Required field
          table: 'role',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
      await queryInterface.addConstraint('employee', {
        fields: ['department_id'],
        type: 'foreign key',
        name: 'employee_fk_department',
        references: { //Required field
          table: 'department',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
      await queryInterface.addConstraint('department', {
        fields: ['manager_id'],
        type: 'foreign key',
        name: 'department_fk_employee',
        references: { //Required field
          table: 'employee',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
      await queryInterface.addConstraint('task', {
        fields: ['current_employee'],
        type: 'foreign key',
        name: 'task_fk_employee',
        references: { //Required field
          table: 'employee',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
      await queryInterface.addConstraint('report', {
        fields: ['reporter'],
        type: 'foreign key',
        name: 'report_fk_employee',
        references: { //Required field
          table: 'employee',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
      await queryInterface.addConstraint('report', {
        fields: ['task_id'],
        type: 'foreign key',
        name: 'report_fk_task',
        references: { //Required field
          table: 'task',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('employee', 'employee_fk_role');
    await queryInterface.removeConstraint('employee', 'employee_fk_department');
    await queryInterface.removeConstraint('department', 'department_fk_employee');
    await queryInterface.removeConstraint('task', 'task_fk_employee');
    await queryInterface.removeConstraint('report', 'report_fk_employee');
    await queryInterface.removeConstraint('report', 'report_fk_task');
  }
};
