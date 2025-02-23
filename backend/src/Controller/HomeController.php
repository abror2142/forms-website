<?php

namespace App\Controller;

use App\Entity\Form;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Tag;
final class HomeController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer){
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/api/home', name: 'app_home', methods: ['GET'])]
    public function index(): Response
    {   
        $tags = $this->entityManager->getRepository(Tag::class)->findAll();
        $tagsData = $this->serializer->serialize($tags, 'json', ['groups' => ['tag:read']]);
        $latestForms = $this->entityManager->getRepository(Form::class)->findLatest(9);
        $latestFormsData = $this->serializer->serialize($latestForms, 'json', ['groups' => ['form:card', 'user:read']]);
        $data = ["tags" => $tagsData, 'latestForms' => $latestFormsData];
        return new JsonResponse($data);
    }
}
