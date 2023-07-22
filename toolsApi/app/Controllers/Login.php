<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use \Firebase\JWT\JWT;

class Login extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $useModel = new UserModel();

        $nick = $this->request->getVar('nick');
        $email = $this->request->getVar('email');
        $phone = $this->request->getVar('phone');
        $password = $this->request->getVar('password');

        $user = $useModel->where('email', $email)->first();

        if (is_null($user)) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }

        $pwd_verify = password_verify($password, $user['password']);

        if (!$pwd_verify) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }

        $key = getenv('JWT_SECRET');
        $iat = time(); // current timestamp value
        $exp = $iat + 3600;

        $payload = array(
            "iss" => "Issuer of the JWT",
            "aud" => "Audience that the JWT",
            "sub" => "Subject of the JWT",
            "aud" => $iat, //Time the JWT issued at
            "aud" => $exp, //Time the JWT issued at
            "aud" => $user['email'],
            "nick" => $user['nick'],
        );

        $token = JWT::encode($payload, $key, 'HS256');

        $response = [
            'message' => 'Login Succesful',
            'token' => $token
        ];

        return $this->respond($response, 200);
    }

}