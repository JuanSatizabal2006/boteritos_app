from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Historiaclinica, Condicion
from ..serialzer.historiaClinicaSerializer import HistoriaClinicaSerializer, CondicionSerializer
from ..querySql import querySql
from url import urlHost

@api_view(['GET'])
def HistoriaClinicaOne(request,id):
    if request.method == 'GET':
        
        query = querySql("SELECT `historiaclinica`.`medicamentos`,`historiaclinica`.`archivo`, `historiaclinica`.`restriccionesAlimenticias`, `historiaclinica`.`observacion`, `condicion`.`idHistoriaClinica`,`condicion`.`idDiagnostico`, `condicion`.`idDiscapacidad`, `diagnostico`.`diagnostico`, `discapacidad`.`discapacidad` FROM `estudiante` LEFT JOIN `historiaclinica` ON `historiaclinica`.`idEstudiante` = `estudiante`.`idEstudiante` LEFT JOIN `condicion` ON `condicion`.`idHistoriaClinica` = `historiaclinica`.`idHistoriaClinica` LEFT JOIN `diagnostico` ON `condicion`.`idDiagnostico` = `diagnostico`.`idDiagnostico` LEFT JOIN `discapacidad` ON `condicion`.`idDiscapacidad` = `discapacidad`.`idDiscapacidad` WHERE `historiaclinica`.`idEstudiante` = %s", [id])
        
        if len(query) == 0:
            return Response({
                "message" : "Datos vacios",
                "error" : "Historia clinica no encontrada"
            },status=status.HTTP_400_BAD_REQUEST)
        
        historClinica = []

        for values in query:
            values['archivo'] = f"{urlHost}{values['archivo']}"
            historClinica.append(values)
            
        return Response({
            "message" : "Datos encontrados",
            "data" : historClinica
        }, status=status.HTTP_200_OK)

#FALTA POST Y PUT
@api_view(['POST','PUT'])
def HistoriaClinica(request):
    
    if request.method == 'POST':
        datos = request.data
        srHistoriaClinica = HistoriaClinicaSerializer(data = datos)
        
        if not srHistoriaClinica.is_valid():
            return Response({
                "message" : "Creacion historia clinica cancelada",
                "error" : srHistoriaClinica.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        srHistoriaClinica.save()
        
        idHistoriaClinica = srHistoriaClinica.data.get('idhistoriaclinica')
        
        if not idHistoriaClinica:
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : [
                    {
                        "idhistoriaclinica" : "El id es obligatorio"
                    }
                ]
            },status=status.HTTP_400_BAD_REQUEST)
        
        datos['idhistoriaclinica'] = idHistoriaClinica
        
        srCondicion = CondicionSerializer(data = datos)
        
        if srCondicion.is_valid():
            srCondicion.save()
            
            return Response({
                "message" : "¡Historia clinica creada con exito!",
                "data" : {
                    "historiaClinica" : srHistoriaClinica.data,
                    "condicion" : srCondicion.data
                }
            },status=status.HTTP_200_OK)
            
        return Response({
            "message" : "Creacion de condicion cancelada",
            "error" : srCondicion.errors
        },status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'PUT':
        
        idHistoriaClinica = request.data.get('idhistoriaclinica')
        
        if not idHistoriaClinica:
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : [
                    {
                        "idhistoriaclinica" : "El id es obligatorio"
                    }
                ]
            },status=status.HTTP_400_BAD_REQUEST)
            
        query = Historiaclinica.objects.filter(idhistoriaclinica = idHistoriaClinica).first()
        queryCondicion = Condicion.objects.filter(idhistoriaclinica = idHistoriaClinica).first()
        
        if not query:
            return Response({
                "message" : "Actualizacion cancelada",
                "error" : "Historia clinica no encontrada"
            },status=status.HTTP_404_NOT_FOUND)
        
        srHistoriaClinica = HistoriaClinicaSerializer(query, data = request.data, partial = True)
        
        if not srHistoriaClinica.is_valid():
           return Response({
               "message": "Actualizacion cancelada",
               "error" : srHistoriaClinica.errors
           }) 
        
        
        srCondicion = CondicionSerializer(queryCondicion,data = request.data)
        
        if srCondicion.is_valid():
            
            srHistoriaClinica.save()
            srCondicion.save()
            
            return Response({
                "message" : "¡Actualizacion realizada con exito!",
                "data" : {
                    "historiaClinica" : srHistoriaClinica.data,
                    "condicion" : srCondicion.data
                }
            },status=status.HTTP_201_CREATED)
        
        return Response({
            "message" : "Actualizacion cancelada",
            "error" : {
                "historiaClinica" : srHistoriaClinica.errors,
                "condicion" : srCondicion.errors
            }
        })
