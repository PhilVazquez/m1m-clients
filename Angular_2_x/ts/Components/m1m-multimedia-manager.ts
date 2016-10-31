import { Component, Input 	} from "@angular/core";
import {CommService, DataDlnaDevices, MediaServer, MediaRenderer} from "../Services/CommService";

@Component({
    moduleId        : __moduleName || module.id,
    selector		: "comp-multimedia-manager",
    templateUrl		: "m1m-multimedia-manager.html", //"ts/Components/m1m-multimedia-manager.html", //
    styleUrls       : [ "m1m-multimedia-manager.css" ] // [ "ts/Components/m1m-multimedia-manager.css" ]
})
export class CompMultimediaManager {
    @Input() title	: string;
    mediaRenderers  : MediaRenderer[] = [];
    mediaServers    : MediaServer  [] = [];
    constructor(private comm: CommService) {
        //console.log( "CommService:", comm);
        comm.init( localStorage.getItem( "TActHab_adresse" ) ).subscribe( (data: DataDlnaDevices) => {
            //console.log( "init =>", data );
            this.mediaRenderers = data.mediaRenderers;
            this.mediaServers   = data.mediaServers;
        });
    }
}
