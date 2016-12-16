System.register(["@angular/core", "../Services/CommService"], function(exports_1, context_1) {
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
    var M1mMediaBrowser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            }],
        execute: function() {
            M1mMediaBrowser = class M1mMediaBrowser {
                constructor(cs) {
                    this.cs = cs;
                    this.breadcrumb = [];
                    // console.log( "CommService:", cs);
                }
                browseMediaServer(ms) {
                    this.breadcrumb = [];
                    this.ms = ms;
                    this.data = null;
                    if (ms) {
                        this.browse();
                    }
                }
                browse(directory) {
                    let directoryId;
                    if (directory) {
                        directoryId = directory.directoryId;
                        let keep = true;
                        this.breadcrumb = this.breadcrumb.filter(D => keep && (keep = D !== directory));
                        this.breadcrumb.push(directory);
                    }
                    else {
                        directoryId = "0";
                    }
                    this.data = null;
                    return this.cs.browse(this.ms.id, directoryId).then((data) => {
                        console.log("Browse", this.ms.id, directoryId, "=>", data);
                        this.data = data;
                    });
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], M1mMediaBrowser.prototype, "devices", void 0);
            M1mMediaBrowser = __decorate([
                core_1.Component({
                    selector: "m1m-media-browser",
                    templateUrl: "ts/Components/m1m-media-browser.html",
                    styleUrls: ["ts/Components/m1m-media-browser.css"
                    ]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], M1mMediaBrowser);
            exports_1("M1mMediaBrowser", M1mMediaBrowser);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQTtnQkFLSSxZQUFvQixFQUFlO29CQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7b0JBSDNCLGVBQVUsR0FBb0IsRUFBRSxDQUFDO29CQUlyQyxvQ0FBb0M7Z0JBQ3hDLENBQUM7Z0JBQ0QsaUJBQWlCLENBQUMsRUFBZTtvQkFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQVcsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxHQUFTLElBQUksQ0FBQztvQkFDdkIsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xCLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNLENBQUUsU0FBcUI7b0JBQ3pCLElBQUksV0FBbUIsQ0FBQztvQkFDeEIsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzt3QkFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO3dCQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFFLENBQUM7d0JBQ2hGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLFdBQVcsR0FBRyxHQUFHLENBQUM7b0JBQ3RCLENBQUM7b0JBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxJQUFJO3dCQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBRSxDQUFDO3dCQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUNMLENBQUM7WUEvQkc7Z0JBQUMsWUFBSyxFQUFFOzs0REFBQTtZQVBaO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsUUFBUSxFQUFJLG1CQUFtQjtvQkFDL0IsV0FBVyxFQUFJLHNDQUFzQztvQkFDckQsU0FBUyxFQUFTLENBQUUscUNBQXFDO3FCQUN0QztpQkFDdEIsQ0FBQzs7K0JBQUE7WUFDRiw2Q0FnQ0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL20xbS1tZWRpYS1icm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCBcdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbVNlcnZpY2UsIERpcmVjdG9yeSwgTWVkaWFTZXJ2ZXIsIERhdGFCcm93c2V9IGZyb20gXCIuLi9TZXJ2aWNlcy9Db21tU2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0XHQ6IFwibTFtLW1lZGlhLWJyb3dzZXJcIixcbiAgICB0ZW1wbGF0ZVVybFx0XHQ6IFwidHMvQ29tcG9uZW50cy9tMW0tbWVkaWEtYnJvd3Nlci5odG1sXCIsXG4gICAgc3R5bGVVcmxzICAgICAgIDogWyBcInRzL0NvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXIuY3NzXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE0xbU1lZGlhQnJvd3NlciB7XG4gICAgQElucHV0KCkgZGV2aWNlc1x0OiBNZWRpYVNlcnZlcltdO1xuICAgIHByaXZhdGUgYnJlYWRjcnVtYiAgOiBEaXJlY3RvcnkgIFtdID0gW107XG4gICAgcHJpdmF0ZSBkYXRhICAgICAgICA6IERhdGFCcm93c2U7XG4gICAgcHJpdmF0ZSBtcyAgICAgICAgICA6IE1lZGlhU2VydmVyO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3M6IENvbW1TZXJ2aWNlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCBcIkNvbW1TZXJ2aWNlOlwiLCBjcyk7XG4gICAgfVxuICAgIGJyb3dzZU1lZGlhU2VydmVyKG1zOiBNZWRpYVNlcnZlcikge1xuICAgICAgICB0aGlzLmJyZWFkY3J1bWIgPSBbXTtcbiAgICAgICAgdGhpcy5tcyAgICAgICAgID0gbXM7XG4gICAgICAgIHRoaXMuZGF0YSAgICAgICA9IG51bGw7XG4gICAgICAgIGlmKG1zKSB7XG4gICAgICAgICAgICB0aGlzLmJyb3dzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJyb3dzZSggZGlyZWN0b3J5PzogRGlyZWN0b3J5ICkge1xuICAgICAgICBsZXQgZGlyZWN0b3J5SWQ6IHN0cmluZztcbiAgICAgICAgaWYoZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBkaXJlY3RvcnlJZCA9IGRpcmVjdG9yeS5kaXJlY3RvcnlJZDtcbiAgICAgICAgICAgIGxldCBrZWVwID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYiA9IHRoaXMuYnJlYWRjcnVtYi5maWx0ZXIoIEQgPT4ga2VlcCAmJiAoa2VlcD1EICE9PSBkaXJlY3RvcnkpICk7XG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIucHVzaChkaXJlY3RvcnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlyZWN0b3J5SWQgPSBcIjBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5icm93c2UoIHRoaXMubXMuaWQsIGRpcmVjdG9yeUlkICkudGhlbiggKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIkJyb3dzZVwiLCB0aGlzLm1zLmlkLCBkaXJlY3RvcnlJZCwgXCI9PlwiLCBkYXRhICk7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
