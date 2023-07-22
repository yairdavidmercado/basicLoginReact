<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class AddUser extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
            'type' => 'BIGINT',
            'constraint' => 255,
            'unsigned' => true,
            'auto_increment' => true
            ],
            'nick' => [
            'type' => 'VARCHAR',
            'unique' => true,
            'constraint' => '255',
            ],
            'email' => [
            'type' => 'VARCHAR',
            'unique' => true,
            'constraint' => '255',
            ],
            'phone' => [
            'type' => 'VARCHAR',
            'unique' => true,
            'constraint' => '20',
            ],
            'password' => [
            'type' => 'VARCHAR',
            'constraint' => '255',
            ],
            'created_at' => [
            'type' => 'TIMESTAMP',
            'null' => true,
            'default' => new RawSql('CURRENT_TIMESTAMP')
            ],
            'updated_at' => [
            'type' => 'TIMESTAMP',
            'null' => true
            ],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('users');
    }
  
    public function down()
    {
        $this->forge->dropTable('users');
    }
}
