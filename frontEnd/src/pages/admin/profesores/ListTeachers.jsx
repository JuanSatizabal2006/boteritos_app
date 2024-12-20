import { LayoutGeneral } from '../../../layouts/LayoutGeneral'
import List from '../../../sections/admin/profesores/List'

const ListTeachers = () => {
  return (
    <LayoutGeneral titleHeader="Profesores">
      <List />
    </LayoutGeneral>
  )
}

export default ListTeachers;