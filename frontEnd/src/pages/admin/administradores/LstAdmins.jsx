import { LayoutGeneral } from '../../../layouts/LayoutGeneral'
import { ListAdminsSection } from '../../../sections/admin/administradores/ListadminsSection';


const ListAdmins = () => {
  return (
    <LayoutGeneral titleHeader="Profesores">
      <ListAdminsSection />
    </LayoutGeneral>
  )
}

export default ListAdmins;