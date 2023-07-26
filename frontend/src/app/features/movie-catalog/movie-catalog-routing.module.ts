import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieCatalogComponent } from "./movie-catalog.component";

const routes:Routes=[
    {
        path:'',
        component:MovieCatalogComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MovieCatalogRoutingModule{}