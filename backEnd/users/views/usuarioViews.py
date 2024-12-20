from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import QueryDict
from ..models import Usuario, Admin

from ..serialzer.usuarioSerializer import UsuarioSerializer
from ..serialzer.adminSerializer import AdminSerializer
from ..serialzer.fechasSerizalizer import FechasSerializer
from ..serialzer.direccionSerializer import DireccionSerializer
from ..serialzer.datosMedicosSerializer import DatosMedicosSerializer
from ..serialzer.telefonosSerializer import TelefonosSerializer
from url import urlHost
from ..querySql import querySql

@api_view(['POST', 'PUT'])
def AdminCreateView(request):
    
    if request.method == 'POST':
        datos = request.data        
        #----------USUARIO----------
        serializerUsuario = UsuarioSerializer(data = datos)
        
        if not serializerUsuario.is_valid():
            return Response({
                "message" : "Creacion del usuario cancelada",
                "error" : serializerUsuario.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
        serializerUsuario.save()
        
        idUsuario = serializerUsuario.data['idusuario']
        datos['idusuario'] = idUsuario
        
        #----------FECHAS----------
        serializerFechas = FechasSerializer(data = datos)
        #VALIDAMOS FECHAS
        if not serializerFechas.is_valid():
            return Response({
                "message" : "Insert en fechas cancelado",
                "erorr" : serializerFechas.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        #----------DIRECCION----------
        direccionSerializer = DireccionSerializer(data = datos)
        if not direccionSerializer.is_valid():
            return Response({
                "message" : "Insert en direccion cancelado",
                "error" : direccionSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        #----------DATOS MEDICOS----------
        datosMedicosSerializer = DatosMedicosSerializer(data = datos)
        if not datosMedicosSerializer.is_valid():
            return Response({
                "message" : "Insert en datos medicos cancelado",
                "error" : datosMedicosSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        #----------TELEFONOS----------
        telefonoSerializer = TelefonosSerializer(data = datos)
        if not telefonoSerializer.is_valid():
            return Response({
                "message" : "Insert en telefonos cancelado",
                "error" : telefonoSerializer.errors
            },status=status.HTTP_400_BAD_REQUEST) 
        
        #----------ESTUDIANTE----------
        srAdmin = AdminSerializer(data = datos)
        if not srAdmin.is_valid():
            return Response({
                "message" : "Insert en tabla admin cancelada",
                "error" : srAdmin.errors
            }, status= status.HTTP_400_BAD_REQUEST)
            
        #GUARDAMOS FECHAS
        serializerFechas.save()
        #GUARDAMOS DIRECCION
        direccionSerializer.save()
        datosMedicosSerializer.save()
        telefonoSerializer.save()
        srAdmin.save()  
             
        return Response({
            "usuario" : serializerUsuario.data,
            "fechas" : serializerFechas.data,
            "direccion" : direccionSerializer.data,
            "datosMedicos" : datosMedicosSerializer.data,
            "telefono" : telefonoSerializer.data,
            "admin" : srAdmin.data
        }, status=status.HTTP_201_CREATED)
    
    if request.method == 'PUT':
        
        idAdmin = request.data.get('idadmin')
        data = QueryDict(mutable=True)
        
        if not idAdmin:
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : "El id del admin es obligatorio"
            },status=status.HTTP_400_BAD_REQUEST)

        data.update(request.data)
        
        #CONSULTA CON ORM QUE ME PERMITE REALIZAR UN JOIIN ENTRE LA TABLA ADMIN Y USUARIOS
        queryAdmin = Admin.objects.select_related('idusuario').filter(idadmin = idAdmin).first()
        
        #VALIDAMOS QUE SE ENCUENTRE EL PROFESOR
        if not queryAdmin : 
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : "Profesor no encontrado"
            }, status=status.HTTP_404_NOT_FOUND)
        
        #OBTENEMOS EL ID DEL USUARIO PARA CONTINUAR CON LA ACTUALIZACION
        idUsuario = queryAdmin.idusuario.idusuario
        
        #ASIGNAMOS EL ID DEL USUARIO YA QUE ES UN DATO NECESARIO PARA REALIZAR LA ACTUALIZACION
        data['idusuario'] = idUsuario
        
        srAdmin = AdminSerializer(queryAdmin, data = data, partial = True)
        
        #VALIDACION
        if not srAdmin.is_valid():
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : srAdmin.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
        #CONSULTA AL USUARIO
        queryUsuario = Usuario.objects.filter(idusuario = idUsuario).first()
                
        srUsuario = UsuarioSerializer(queryUsuario, data = data, partial = True)
        
        if not srUsuario.is_valid():
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : srUsuario.errors
            })
            
        #INSERCION DE DATOS EN AMBAS TABLAS
        srUsuario.save()
        srAdmin.save()
    
        return Response({
            "message" : "Actualizacion realizada con exito",
            "data" : {
                "usuario" : srUsuario.data,
                "profesor" : srAdmin.data
            }
        },status=status.HTTP_201_CREATED)


@api_view(['GET'])
def AdminDataPersonal(request,id):
    if request.method == 'GET':
        query = querySql("SELECT `usuario`.`nombre`, `usuario`.`apellido`, `usuario`.`correo`, `usuario`.`documento`,`usuario`.`edad`, `usuario`.`imagen`,`usuario`.`idSexo`, `sexo`.`sexo`, `tipodocumento`.`tipoDocumento`, `usuario`.`idTipoDocumento` FROM `admin` LEFT JOIN `usuario` ON `admin`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `sexo` ON `usuario`.`idSexo` = `sexo`.`idSexo` LEFT JOIN `tipodocumento` ON `usuario`.`idTipoDocumento` = `tipodocumento`.`idTipoDocumento` WHERE `admin`.`idAdmin` = %s;", [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "Administrador no encontrado"
            })
        
        return Response({
            "message" : "Datos encontrados",
            "datos" : query
        })

#ENDPOINT PARA LISTAR LOS ESTUDIANTES PARA LA TABLA DE ADMIN
@api_view(['GET'])
def AdminTable(request, nombre):
    
    if request.method == "GET":
        
        #LOGICA PARA VALIDAR SI ESTA USANDO EL BUSCADOR O NO
        like = '%'
        if nombre != 'all':
            like = nombre + '%'
        
        query = querySql("SELECT `admin`.*, CONCAT(`usuario`.`nombre`, ' ', `usuario`.`apellido`) AS 'nombre', `usuario`.`documento` FROM `admin` LEFT JOIN `usuario` ON `admin`.`idUsuario` = `usuario`.`idUsuario` WHERE `usuario`.`nombre` LIKE %s;", [like])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "No se encontraron administradores"
            },status=status.HTTP_404_NOT_FOUND)
        
        return Response(query)

#ENDPOINT PARA MOSTRAR INFORMACION EN EL HEAD DE CADA LISTA DE ADMINISTRADORES
@api_view(['GET'])
def AdminHeader(request,idadmin):
    
    if request.method == "GET":
        
        if not idadmin:
            return Response({
                "message" : "Consulta fallida",
                "error" : "El id del admin es obligatorio"
            },status=status.HTTP_400_BAD_REQUEST)

        #CONSULTA PARA OBTENER LOS DATOS DEL ADMIN
        query = querySql("SELECT `admin`.*, CONCAT(`usuario`.`nombre`, ' ' , `usuario`.`apellido`) AS 'nombre', `usuario`.`imagen` ,`telefonos`.`telefono1`, `usuario`.`documento`, `usuario`.`edad`, `telefonos`.`telefono2` FROM `admin` LEFT JOIN `usuario` ON `admin`.`idUsuario` = `usuario`.`idUsuario` LEFT JOIN `telefonos` ON `telefonos`.`idUsuario` = `usuario`.`idUsuario` WHERE `admin`.`idAdmin` = %s ;",[idadmin])
        
        print(query)
        
        if len(query) == 0:
            return Response({
                "message" : "Consulta realizada",
                "error" : "Datos vacios"
            },status=status.HTTP_204_NO_CONTENT)
            
        infoAdmin = query[0]
        
        dataHead = {
            'card1' : {
                "id" : infoAdmin['idadmin'],
                "nombre" : infoAdmin['nombre'],
                "imagen" : f"{urlHost}{infoAdmin['imagen']}",
                "documento" : infoAdmin['documento'],
                "edad" : infoAdmin['edad']
            },
            'card2' : [
                {
                    "name" : "Telefono 1",
                    "value" : infoAdmin['telefono1']
                },
                {
                    "name" : "Telefono 2",
                    "value" : infoAdmin['telefono2']
                }
            ]
        }
   
        return Response({
            "message" : "¡Consulta exitosa!",
            "data" : dataHead
        }, status=status.HTTP_200_OK)