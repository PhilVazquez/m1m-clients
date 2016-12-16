import { Component, Input 	} from "@angular/core";
import {CommService, Directory, MediaServer, DataBrowse} from "../Services/CommService";

@Component({
    selector		: "m1m-media-browser",
    templateUrl		: "ts/Components/m1m-media-browser.html",
    styleUrls       : [ "ts/Components/m1m-media-browser.css"
                      ]
})
export class M1mMediaBrowser {
    @Input() devices	: MediaServer[];
    private breadcrumb  : Directory  [] = [];
    private data        : DataBrowse;
    private ms          : MediaServer;
    constructor(private cs: CommService) {
        // console.log( "CommService:", cs);
    }
    browseMediaServer(ms: MediaServer) {
        this.breadcrumb = [];
        this.ms         = ms;
        this.data       = null;
        if(ms) {
            this.browse();
        }
    }
    browse( directory?: Directory ) {
        let directoryId: string;
        if(directory) {
            directoryId = directory.directoryId;
            let keep = true;
            this.breadcrumb = this.breadcrumb.filter( D => keep && (keep=D !== directory) );
            this.breadcrumb.push(directory);
        } else {
            directoryId = "0";
        }
        this.data = null;
        return this.cs.browse( this.ms.id, directoryId ).then( (data) => {
            console.log( "Browse", this.ms.id, directoryId, "=>", data );
            this.data = data;
        });
    }
}
