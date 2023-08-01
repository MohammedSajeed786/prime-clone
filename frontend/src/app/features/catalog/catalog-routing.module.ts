import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieCatalogComponent } from "./components/movie-catalog/movie-catalog.component";
import { GenreCatalogComponent } from "./components/genre-catalog/genre-catalog.component";

const routes:Routes=[
    {
        path:'',
        pathMatch:'full',
        component:MovieCatalogComponent
    },
    {
        path:':genre',
        component:GenreCatalogComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CatalogRoutingModule{}