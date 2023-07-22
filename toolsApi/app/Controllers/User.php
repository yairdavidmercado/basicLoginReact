<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class User extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $users = new UserModel;
        return $this->respond(['users' => $users->findAll()], 200);
    }

    public function getUserById($id)
    {
        $users = new UserModel;
        return $this->respond(['user' => $users->where('id', $id)->get()->getRowArray()], 200);
    }
}