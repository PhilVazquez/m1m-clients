System.register(["@angular/core", "../Services/CommService", "hammerjs"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, CommService_1;
    var PLAY_STATE, M1mMediaRenderer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            },
            function (_1) {}],
        execute: function() {
            (function (PLAY_STATE) {
                PLAY_STATE[PLAY_STATE["PLAY"] = 0] = "PLAY";
                PLAY_STATE[PLAY_STATE["PAUSE"] = 1] = "PAUSE";
                PLAY_STATE[PLAY_STATE["STOP"] = 2] = "STOP";
            })(PLAY_STATE || (PLAY_STATE = {}));
            M1mMediaRenderer = class M1mMediaRenderer {
                // tapped      = false;
                constructor(cs) {
                    this.cs = cs;
                    this.duration = "";
                    this.mute = false;
                    this.volume = 0;
                    this.playState = PLAY_STATE.STOP;
                    // ...
                }
                ngOnInit() {
                    // From TActHab
                    this.obsEvent = this.cs.subscribe(this.nf.id);
                    this.obsEvent.subscribe((event) => {
                        let data = event.data;
                        console.log("M1mMediaRenderer UPnP event", event.data.attribut);
                        this.state[data.serviceType][data.attribut] = data.value;
                        this.updateRenderingControl(this.state["urn:schemas-upnp-org:service:RenderingControl:1"]);
                        this.updateAVTransport(this.state["urn:schemas-upnp-org:service:AVTransport:1"]);
                        //
                        if (data.serviceType === "UPnP_Media" && data.attribut === "itemMetadata") {
                            this.currentMedia = this.cs.getMediaFromDIDL(data.value);
                        }
                    });
                    this.cs.call(this.nf.id, "getMediasStates", []).then((state) => {
                        console.log("getMediasStates =>", state);
                        this.state = state;
                        let AVTransport = this.state["urn:schemas-upnp-org:service:AVTransport:1"], RenderingControl = this.state["urn:schemas-upnp-org:service:RenderingControl:1"], UPnP_Media = this.state["UPnP_Media"];
                        this.updateRenderingControl(RenderingControl);
                        this.updateAVTransport(AVTransport);
                        if (UPnP_Media && UPnP_Media.itemMetadata) {
                            this.currentMedia = this.cs.getMediaFromDIDL(UPnP_Media.itemMetadata);
                        }
                    });
                }
                Log(str) {
                    console.log("Log:", str);
                }
                /*toggleTap() {
                    this.tapped = !this.tapped;
                }*/
                updateRenderingControl(renderingControl) {
                    if (!renderingControl)
                        return;
                    this.mute = renderingControl.Mute === "1" || renderingControl.Mute === "true";
                    this.volume = +renderingControl.Volume;
                }
                updateAVTransport(AVTransport) {
                    if (!AVTransport)
                        return;
                    this.duration = AVTransport.CurrentMediaDuration;
                    switch (AVTransport.TransportState) {
                        case "STOPPED":
                            this.playState = PLAY_STATE.STOP;
                            break;
                        case "PLAYING":
                            this.playState = PLAY_STATE.PLAY;
                            break;
                        case "PAUSED_PLAYBACK":
                            this.playState = PLAY_STATE.PAUSE;
                            break;
                    }
                }
                setVolume(volume) {
                    // console.log( "setVolume", volume );
                    clearTimeout(this.timeoutVol);
                    this.timeoutVol = window.setTimeout(() => this.cs.setVolume(this.nf.id, volume), 50);
                }
                isPlaying() { return this.playState === PLAY_STATE.PLAY; }
                isPaused() { return this.playState === PLAY_STATE.PAUSE; }
                isStopped() { return this.playState === PLAY_STATE.STOP; }
                play() {
                    return this.cs.play(this.nf.id);
                }
                pause() {
                    return this.cs.pause(this.nf.id);
                }
                stop() {
                    return this.cs.stop(this.nf.id);
                }
                isMedia(obj) {
                    console.log("isMedia", obj);
                    return true;
                }
                loadMedia(media) {
                    console.log(this.nf.id, "loadMedia", media.serverId, media.mediaId);
                    this.cs.loadMedia(this.nf.id, media.serverId, media.mediaId).then((rep) => {
                        console.log("rep:", rep);
                        this.play().then(() => {
                            // Subscribe to media server
                        });
                    });
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], M1mMediaRenderer.prototype, "nf", void 0);
            M1mMediaRenderer = __decorate([
                core_1.Component({
                    selector: "m1m-media-renderer",
                    templateUrl: "ts/Components/m1m-media-renderer.html",
                    styleUrls: ["ts/Components/m1m-media-renderer.css"]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], M1mMediaRenderer);
            exports_1("M1mMediaRenderer", M1mMediaRenderer);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW1lZGlhLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXdDQSxXQUFLLFVBQVU7Z0JBQUUsMkNBQUksQ0FBQTtnQkFBRSw2Q0FBSyxDQUFBO2dCQUFFLDJDQUFJLENBQUE7WUFBQSxDQUFDLEVBQTlCLFVBQVUsS0FBVixVQUFVLFFBQW9CO1lBTW5DO2dCQVlJLHVCQUF1QjtnQkFDdkIsWUFBb0IsRUFBZTtvQkFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO29CQVBuQyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztvQkFFN0IsU0FBSSxHQUFzQixLQUFLLENBQUM7b0JBQ2hDLFdBQU0sR0FBb0IsQ0FBQyxDQUFDO29CQUU1QixjQUFTLEdBQWlCLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBR3RDLE1BQU07Z0JBQ1YsQ0FBQztnQkFDRCxRQUFRO29CQUNKLGVBQWU7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDO29CQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBRSxDQUFDLEtBQWtEO3dCQUN4RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFFLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7d0JBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUN6RCxJQUFJLENBQUMsc0JBQXNCLENBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLENBQUM7d0JBQzdGLElBQUksQ0FBQyxpQkFBaUIsQ0FBUSxJQUFJLENB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QUFDLEVBQUUsQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFFLENBQUMsSUFBSSxDQUFFLENBQUMsR0FBRzt3QkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUU7NEJBQ2QsNEJBQTRCO3dCQUNoQyxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQztZQTlGRztnQkFBQyxZQUFLLEVBQUU7O3dEQUFBO1lBTlo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUksb0JBQW9CO29CQUNoQyxXQUFXLEVBQUksdUNBQXVDO29CQUN0RCxTQUFTLEVBQVMsQ0FBRSxzQ0FBc0MsQ0FBRTtpQkFDL0QsQ0FBQzs7Z0NBQUE7WUFDRiwrQ0ErRkMsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL20xbS1tZWRpYS1yZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tU2VydmljZSwgTWVkaWFSZW5kZXJlciwgTWVkaWF9IGZyb20gXCIuLi9TZXJ2aWNlcy9Db21tU2VydmljZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IFwiaGFtbWVyanNcIjtcblxudHlwZSBSZW5kZXJpbmdDb250cm9sVHlwZSA9IHtcbiAgICBNdXRlICAgICAgICAgICAgOiBzdHJpbmc7IC8vIFwiMFwiIG91IFwiMVwiXG4gICAgUHJlc2V0TmFtZUxpc3QgIDogc3RyaW5nOyAvLyBleDogXCJGYWN0b3J5RGVmYXVsdHNcIlxuICAgIFZvbHVtZSAgICAgICAgICA6IHN0cmluZzsgLy8gXCIwXCIgw6AgXCIxMDBcIlxuICAgIFZvbHVtZURCICAgICAgICA6IHN0cmluZzsgLy8gZMOpZHVjdGlvbiBkZXMgZMOpY2liZWxzLCBvcHBvc8OpIGRlIFZvbHVtZVxufTtcbnR5cGUgQVZUcmFuc3BvcnRUeXBlID0ge1xuICAgIEFWVHJhbnNwb3J0VVJJICAgICAgICAgICAgICA6IHN0cmluZzsgLy8gVVJJIGR1IG3DqWRpYVxuICAgIEFWVHJhbnNwb3J0VVJJTWV0YURhdGEgICAgICA6IHN0cmluZzsgLy8gUmVwcsOpc2VudGUgbGUgRElETC1MaXRlIGR1IG3DqWRpYVxuICAgIEN1cnJlbnRNZWRpYUR1cmF0aW9uICAgICAgICA6IHN0cmluZzsgLy8gRm9ybWF0IHR5cGUgXCIwMTozNjo1MFwiXG4gICAgQ3VycmVudFBsYXlNb2RlICAgICAgICAgICAgIDogc3RyaW5nOyAvLyBleDogXCJOT1JNQUxcIlxuICAgIEN1cnJlbnRSZWNvcmRRdWFsaXR5TW9kZSAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9UX0lNUExFTUVOVEVEXCJcbiAgICBDdXJyZW50VHJhY2sgICAgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIjFcIlxuICAgIEN1cnJlbnRUcmFja0R1cmF0aW9uICAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiMDE6MzY6NTBcIlxuICAgIEN1cnJlbnRUcmFja01ldGFEYXRhICAgICAgICA6IHN0cmluZzsgLy8gUmVwcsOpc2VudGUgbGUgRElETC1MaXRlIGRlIGxhIHBpc3RlXG4gICAgQ3VycmVudFRyYWNrVVJJICAgICAgICAgICAgIDogc3RyaW5nOyAvLyBVUkkgZGUgbGEgcGlzdGVcbiAgICBDdXJyZW50VHJhbnNwb3J0QWN0aW9ucyAgICAgOiBzdHJpbmc7IC8vIEFjdGlvbnMgcG9zc2libGUsIGV4OiBcIlBsYXksUGF1c2UsU3RvcCxTZWVrLE5leHQsUHJldmlvdXNcIlxuICAgIE5leHRBVlRyYW5zcG9ydFVSSSAgICAgICAgICA6IHN0cmluZzsgLy8gUHJvY2hhaW5lIFVSSVxuICAgIE5leHRBVlRyYW5zcG9ydFVSSU1ldGFEYXRhICA6IHN0cmluZzsgLy8gUHJvY2hhaW4gRElETFxuICAgIE51bWJlck9mVHJhY2tzICAgICAgICAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiMVwiXG4gICAgUGxheWJhY2tTdG9yYWdlTWVkaXVtICAgICAgIDogc3RyaW5nOyAvLyBleDogXCJOT05FXCJcbiAgICBQb3NzaWJsZVBsYXliYWNrU3RvcmFnZU1lZGlhOiBzdHJpbmc7IC8vIGV4IFwiTk9ORSxORVRXT1JLLEhERCxDRC1EQSxVTktOT1dOXCJcbiAgICBQb3NzaWJsZVJlY29yZFF1YWxpdHlNb2RlcyAgOiBzdHJpbmc7IC8vIGV4OiBcIk5PVF9JTVBMRU1FTlRFRFwiXG4gICAgUG9zc2libGVSZWNvcmRTdG9yYWdlTWVkaWEgIDogc3RyaW5nOyAvLyBleCBcIk5PVF9JTVBMRU1FTlRFRFwiXG4gICAgUmVjb3JkTWVkaXVtV3JpdGVTdGF0dXMgICAgIDogc3RyaW5nOyAvLyBleDogXCJOT1RfSU1QTEVNRU5URURcIlxuICAgIFJlY29yZFN0b3JhZ2VNZWRpdW0gICAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9UX0lNUExFTUVOVEVEXCJcbiAgICBUcmFuc3BvcnRQbGF5U3BlZWQgICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIjFcIlxuICAgIFRyYW5zcG9ydFN0YXRlICAgICAgICAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiUEFVU0VEX1BMQVlCQUNLXCJcbiAgICBUcmFuc3BvcnRTdGF0dXMgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIk9LXCJcbn07XG50eXBlIGV2ZW50TWVkaWFQbGF5ZXIgPSB7XG4gICAgc2VydmljZVR5cGUgOiBzdHJpbmc7XG4gICAgYXR0cmlidXQgICAgOiBzdHJpbmc7XG4gICAgdmFsdWUgICAgICAgOiBudW1iZXIgfCBzdHJpbmc7XG59O1xuZW51bSBQTEFZX1NUQVRFIHtQTEFZLCBQQVVTRSwgU1RPUH1cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yXHRcdDogXCJtMW0tbWVkaWEtcmVuZGVyZXJcIixcbiAgICB0ZW1wbGF0ZVVybFx0XHQ6IFwidHMvQ29tcG9uZW50cy9tMW0tbWVkaWEtcmVuZGVyZXIuaHRtbFwiLFxuICAgIHN0eWxlVXJscyAgICAgICA6IFsgXCJ0cy9Db21wb25lbnRzL20xbS1tZWRpYS1yZW5kZXJlci5jc3NcIiBdXG59KVxuZXhwb3J0IGNsYXNzIE0xbU1lZGlhUmVuZGVyZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIG5mXHQ6IE1lZGlhUmVuZGVyZXI7XG4gICAgb2JzRXZlbnQgICAgOiBPYnNlcnZhYmxlPGFueT47XG4gICAgc3RhdGUgICAgICAgOiB7IFwidXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpBVlRyYW5zcG9ydDoxXCIgICAgICAgIDogQVZUcmFuc3BvcnRUeXBlO1xuICAgICAgICAgICAgICAgICAgICBcInVybjpzY2hlbWFzLXVwbnAtb3JnOnNlcnZpY2U6UmVuZGVyaW5nQ29udHJvbDoxXCIgICA6IFJlbmRlcmluZ0NvbnRyb2xUeXBlO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICBkdXJhdGlvbiAgICA6IHN0cmluZyAgICA9IFwiXCI7XG4gICAgY3VycmVudE1lZGlhOiBNZWRpYTtcbiAgICBtdXRlICAgICAgICA6IGJvb2xlYW4gICA9IGZhbHNlO1xuICAgIHZvbHVtZSAgICAgIDogbnVtYmVyICAgID0gMDtcbiAgICB0aW1lb3V0Vm9sICA6IG51bWJlcjtcbiAgICBwbGF5U3RhdGUgICA6IFBMQVlfU1RBVEU9IFBMQVlfU1RBVEUuU1RPUDtcbiAgICAvLyB0YXBwZWQgICAgICA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3M6IENvbW1TZXJ2aWNlKSB7XG4gICAgICAgIC8vIC4uLlxuICAgIH1cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gRnJvbSBUQWN0SGFiXG4gICAgICAgIHRoaXMub2JzRXZlbnQgPSB0aGlzLmNzLnN1YnNjcmliZSggdGhpcy5uZi5pZCApO1xuICAgICAgICB0aGlzLm9ic0V2ZW50LnN1YnNjcmliZSggKGV2ZW50OiB7ZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGV2ZW50TWVkaWFQbGF5ZXJ9KSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyggXCJNMW1NZWRpYVJlbmRlcmVyIFVQblAgZXZlbnRcIiwgZXZlbnQuZGF0YS5hdHRyaWJ1dCApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVtkYXRhLnNlcnZpY2VUeXBlXVtkYXRhLmF0dHJpYnV0XSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlbmRlcmluZ0NvbnRyb2wgKCB0aGlzLnN0YXRlW1widXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpSZW5kZXJpbmdDb250cm9sOjFcIl0pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBVlRyYW5zcG9ydCAgICAgICggdGhpcy5zdGF0ZVtcInVybjpzY2hlbWFzLXVwbnAtb3JnOnNlcnZpY2U6QVZUcmFuc3BvcnQ6MVwiXSAgICAgKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBpZiAoZGF0YS5zZXJ2aWNlVHlwZSA9PT0gXCJVUG5QX01lZGlhXCIgJiYgZGF0YS5hdHRyaWJ1dCA9PT0gXCJpdGVtTWV0YWRhdGFcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1lZGlhID0gdGhpcy5jcy5nZXRNZWRpYUZyb21ESURMKCBkYXRhLnZhbHVlIGFzIHN0cmluZyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jcy5jYWxsKHRoaXMubmYuaWQsIFwiZ2V0TWVkaWFzU3RhdGVzXCIsIFtdKS50aGVuKCAoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImdldE1lZGlhc1N0YXRlcyA9PlwiLCBzdGF0ZSApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgbGV0IEFWVHJhbnNwb3J0ICAgICAgPSB0aGlzLnN0YXRlW1widXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpBVlRyYW5zcG9ydDoxXCJdLFxuICAgICAgICAgICAgICAgIFJlbmRlcmluZ0NvbnRyb2wgPSB0aGlzLnN0YXRlW1widXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpSZW5kZXJpbmdDb250cm9sOjFcIl0sXG4gICAgICAgICAgICAgICAgVVBuUF9NZWRpYSAgICAgICA9IHRoaXMuc3RhdGVbXCJVUG5QX01lZGlhXCJdO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSZW5kZXJpbmdDb250cm9sICggUmVuZGVyaW5nQ29udHJvbCApO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBVlRyYW5zcG9ydCAgICAgICggQVZUcmFuc3BvcnQgICAgICApO1xuICAgICAgICAgICAgaWYgKCBVUG5QX01lZGlhICYmIFVQblBfTWVkaWEuaXRlbU1ldGFkYXRhICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1lZGlhID0gdGhpcy5jcy5nZXRNZWRpYUZyb21ESURMKCBVUG5QX01lZGlhLml0ZW1NZXRhZGF0YSApO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudE1lZGlhLmR1cmF0aW9uID0gQVZUcmFuc3BvcnQuQ3VycmVudE1lZGlhRHVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBMb2coc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2c6XCIsIHN0cik7XG4gICAgfVxuICAgIC8qdG9nZ2xlVGFwKCkge1xuICAgICAgICB0aGlzLnRhcHBlZCA9ICF0aGlzLnRhcHBlZDtcbiAgICB9Ki9cbiAgICB1cGRhdGVSZW5kZXJpbmdDb250cm9sKHJlbmRlcmluZ0NvbnRyb2w6IFJlbmRlcmluZ0NvbnRyb2xUeXBlKSB7XG4gICAgICAgIGlmKCFyZW5kZXJpbmdDb250cm9sKSByZXR1cm47XG4gICAgICAgIHRoaXMubXV0ZSAgID0gcmVuZGVyaW5nQ29udHJvbC5NdXRlID09PSBcIjFcIiB8fCByZW5kZXJpbmdDb250cm9sLk11dGUgPT09IFwidHJ1ZVwiO1xuICAgICAgICB0aGlzLnZvbHVtZSA9K3JlbmRlcmluZ0NvbnRyb2wuVm9sdW1lO1xuICAgIH1cbiAgICB1cGRhdGVBVlRyYW5zcG9ydChBVlRyYW5zcG9ydDogQVZUcmFuc3BvcnRUeXBlKSB7XG4gICAgICAgIGlmKCFBVlRyYW5zcG9ydCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gQVZUcmFuc3BvcnQuQ3VycmVudE1lZGlhRHVyYXRpb247XG4gICAgICAgIHN3aXRjaChBVlRyYW5zcG9ydC5UcmFuc3BvcnRTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlNUT1BQRURcIiAgICAgICAgICA6IHRoaXMucGxheVN0YXRlID0gUExBWV9TVEFURS5TVE9QIDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiICAgICAgICAgIDogdGhpcy5wbGF5U3RhdGUgPSBQTEFZX1NUQVRFLlBMQVkgOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQQVVTRURfUExBWUJBQ0tcIiAgOiB0aGlzLnBsYXlTdGF0ZSA9IFBMQVlfU1RBVEUuUEFVU0U7IGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFZvbHVtZSh2b2x1bWU6IG51bWJlcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyggXCJzZXRWb2x1bWVcIiwgdm9sdW1lICk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRWb2wpO1xuICAgICAgICB0aGlzLnRpbWVvdXRWb2wgPSB3aW5kb3cuc2V0VGltZW91dCAoICgpID0+IHRoaXMuY3Muc2V0Vm9sdW1lKHRoaXMubmYuaWQsIHZvbHVtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCA1MCApO1xuICAgIH1cbiAgICBpc1BsYXlpbmcoKSA6IGJvb2xlYW4ge3JldHVybiB0aGlzLnBsYXlTdGF0ZSA9PT0gUExBWV9TVEFURS5QTEFZIDt9XG4gICAgaXNQYXVzZWQgKCkgOiBib29sZWFuIHtyZXR1cm4gdGhpcy5wbGF5U3RhdGUgPT09IFBMQVlfU1RBVEUuUEFVU0U7fVxuICAgIGlzU3RvcHBlZCgpIDogYm9vbGVhbiB7cmV0dXJuIHRoaXMucGxheVN0YXRlID09PSBQTEFZX1NUQVRFLlNUT1AgO31cbiAgICBwbGF5KCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5wbGF5KCB0aGlzLm5mLmlkICk7XG4gICAgfVxuICAgIHBhdXNlKCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5wYXVzZSggdGhpcy5uZi5pZCApO1xuICAgIH1cbiAgICBzdG9wKCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5zdG9wKCB0aGlzLm5mLmlkICk7XG4gICAgfVxuICAgIGlzTWVkaWEob2JqOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNNZWRpYVwiLCBvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9hZE1lZGlhKG1lZGlhOiBNZWRpYSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5mLmlkLCBcImxvYWRNZWRpYVwiLCBtZWRpYS5zZXJ2ZXJJZCwgbWVkaWEubWVkaWFJZCk7XG4gICAgICAgIHRoaXMuY3MubG9hZE1lZGlhKCB0aGlzLm5mLmlkLCBtZWRpYS5zZXJ2ZXJJZCwgbWVkaWEubWVkaWFJZCApLnRoZW4oIChyZXApID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVwOlwiLCByZXApO1xuICAgICAgICAgICAgdGhpcy5wbGF5KCkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFN1YnNjcmliZSB0byBtZWRpYSBzZXJ2ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
