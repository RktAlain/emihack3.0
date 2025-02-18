# from django.http import JsonResponse
# def hello_world(request):
#     return JsonResponse({'message': 'Hello from Django!'})

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Ce nom d’utilisateur est déjà pris.'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'Utilisateur créé avec succès !', 'token': get_tokens_for_user(user)})

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({'message': 'Connexion réussie', 'token': get_tokens_for_user(user)})
    else:
        return Response({'error': 'Identifiants incorrects'}, status=400)
