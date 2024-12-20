from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .views.estudianteViews import EstudianteTable, EstudianteHeader, EstudianteCreateView, EstudianteDataPersonal
from .views.historiaClinicaViews import HistoriaClinicaOne, HistoriaClinica
from .views.profesorViews import ProfesorCreateView, ProfesorTable, ProfesorHead, ProfesorDataPersonal
from .views.usuarioViews import AdminCreateView, AdminDataPersonal, AdminHeader, AdminTable
from .views.responsableViews import ResponsableOne, ResponsableView
from .views.dtMedicosViews import DatosMedicosEstudianteOne, DatosMedicosProfesor, DatosMedicosUpdate, DatosMedicosAdmin
from .views.telefonosViews import TelefonosEstudiante, TelefonosProfesor, TelefonosUpdate, TelefonosAdmin
from .views.fechasViews import FechasEstudiantesOne, FechasProfesor,FechasUpdate, FechasAdmin
from .views.direccionViews import DireccionEstudianteOne, DireccionProfesor, DireccionUpdate, DireccionAdmin

from .middleware import searchDocument

@api_view(['POST'])
def prueba(request):
    if request.method == 'POST':
        print(request.data)
        return Response('HOLAAAA')

urlpatterns= [
    
    ##---------------ESTUDIANTES---------------
    path('estudiante/', EstudianteCreateView), #REGISTRO DE ESTUDIANTE
    path('estudiante/<int:id>', EstudianteDataPersonal),
    path('estudiantes/tabla', EstudianteTable),
    path('estudiantes/header/<int:idstud>/<int:idtrim>', EstudianteHeader),
    
    #DATOS EXTRA DE ESTUDIANTES
    path('datosmedicos/estudiante/<int:id>', DatosMedicosEstudianteOne), #SE PASA EL ID DEL ESTUDIANTE
    path('telefono/estudiante/<int:id>', TelefonosEstudiante),#SE PASA EL ID DEL ESTUDIANTE
    path('fechas/estudiante/<int:id>', FechasEstudiantesOne),
    path('direccion/estudiante/<int:id>', DireccionEstudianteOne),
    path('responsable/', ResponsableView),
    path('responsable/<int:id>', ResponsableOne),#SE PASA EL ID DEL ESTUDIANTE  
    path('historiaclinica/', HistoriaClinica),
    path('historiaclinica/<int:id>', HistoriaClinicaOne), #SE PASA EL ID DEL ESTUDIANTE
    
    #---------------PROFESOR---------------
    path('profesor/', ProfesorCreateView),
    path('profesor/<int:id>', ProfesorDataPersonal),
    path('profesor/tabla', ProfesorTable),
    #POSIBLE RUTA PARA DESACTIVAR PROFESORES
    path('profesor/header/<int:idprof>/<int:idtrim>', ProfesorHead),
    
    #DATOS EXTRA DE PROFESORES
    path('datosmedicos/profesor/<int:id>', DatosMedicosProfesor), #SE PASA EL ID DEL PROFESOR
    path('telefono/profesor/<int:id>', TelefonosProfesor),#SE PASA EL ID DEL PROFESOR
    path('fechas/profesor/<int:id>', FechasProfesor), #SE PASA EL ID DEL PROFESOR
    path('direccion/profesor/<int:id>', DireccionProfesor),
    
    #ADMINISTRADOR
    path('admin/', AdminCreateView),
    path('admin/<int:id>', AdminDataPersonal),
    path('admin/header/<int:idadmin>', AdminHeader),
    path('admin/tabla/<str:nombre>', AdminTable),
    
    #DATOS EXTRA ADMIN
    path('datosmedicos/admin/<int:id>', DatosMedicosAdmin),
    path('fechas/admin/<int:id>', FechasAdmin),
    path('telefono/admin/<int:id>', TelefonosAdmin),
    path('direccion/admin/<int:id>', DireccionAdmin),
    
    #ACTUALIZACIONES PARA DATOS EXTRAS DE TODOS LOS USUARIOS
    path('datosmedicos/', DatosMedicosUpdate),
    path('telefono/', TelefonosUpdate),
    path('fechas/', FechasUpdate),
    path('direccion/', DireccionUpdate),
    
    path('checkdoc/<int:doc>', searchDocument),
    path('prueba/', prueba),
    
    #DATOS EXTRA DE PROFESORES
    #path('docs/', include_docs_urls(title='Boteritos API'))
]