from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Direccion, Profesor, Estudiante
from ..serialzer.direccionSerializer import DireccionSerializer
from ..querySql import querySql

@api_view(['GET'])
def DireccionEstudianteOne(request,id):
    if request.method == 'GET':
        
        query = querySql("SELECT `usuario`.`idUsuario`, `estudiante`.`idEstudiante`, `direccion`.* FROM `usuario` LEFT JOIN `estudiante` ON `estudiante`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `direccion` ON `direccion`.`idUsuario` = `usuario`.`idUsuario` WHERE `estudiante`.`idUsuario` = `usuario`.`idUsuario` AND `estudiante`.`idEstudiante` = %s;" , [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "Datos no encontrados"
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "message" : "¡Datos encontrados!",
            "data" : query
        },status=status.HTTP_200_OK)
    
@api_view(['GET'])
def DireccionProfesor(request,id):
    if request.method == 'GET':
                
        query = querySql("SELECT `profesor`.`idProfesor`, `usuario`.`idUsuario`, `direccion`.* FROM `profesor` LEFT JOIN `usuario` ON `profesor`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `direccion` ON `direccion`.`idUsuario` = `usuario`.`idUsuario` WHERE `profesor`.`idUsuario` = `usuario`.`idUsuario` AND `profesor`.`idProfesor` = %s;" , [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "Datos no encontrados"
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "message" : "¡Datos encontrados!",
            "data" : query
        },status=status.HTTP_200_OK)
        
@api_view(['GET'])
def DireccionAdmin(request,id):
    if request.method == 'GET':
                
        query = querySql("SELECT `admin`.*, `direccion`.`idDireccion`, `direccion`.`comuna`, `direccion`.`numero`, `direccion`.`barrio` FROM `admin` LEFT JOIN `usuario` ON `admin`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `direccion` ON `direccion`.`idUsuario` = `usuario`.`idUsuario` WHERE `admin`.`idAdmin` = %s ", [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "Datos no encontrados"
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "message" : "¡Datos encontrados!",
            "data" : query
        },status=status.HTTP_200_OK)

@api_view(['PUT'])
def DireccionUpdate(request):
    if request.method == 'PUT':
        query = Direccion.objects.filter(iddireccion = request.data['iddireccion']).first()
        
        if not query:
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : "Datos no encontrados"
            },status=status.HTTP_404_NOT_FOUND)
        
        srDireccion = DireccionSerializer(query, data = request.data)
        
        if srDireccion.is_valid():
            srDireccion.save()
            return Response({
                "message" : "Actualizacion de direccion con exito!",
                "data" : srDireccion.data
            },status=status.HTTP_201_CREATED)
            
        return Response({
            "message" : "Actualizacion cancelada",
            "error" : srDireccion.errors
        },status=status.HTTP_400_BAD_REQUEST) 