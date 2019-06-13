import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrls: ['./my-assets.component.scss']
})
export class MyAssetsComponent implements OnInit {

  private type: string;
  private assetTypes: Array<AssetType>;
  private assets: Array<Asset>;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  ngOnInit() {
    this.type = this.route.snapshot.params.type;
    this.reloadAssets();

    const uriAssetTypes = '/api/asset/GetTypes';

    this.http.get<Array<AssetType>>(uriAssetTypes, this.httpOptions)
    .subscribe((dataAssetTypes: Array<AssetType>) => {
        this.assetTypes = dataAssetTypes;
      });

    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reloadAssets();
    }});
  }

  reloadAssets() {
    const uriAsset = '/api/asset/GetAlphabetical/' + this.route.snapshot.params.type;
    this.http.get<Array<Asset>>(uriAsset, this.httpOptions)
    .subscribe((dataAssets: Array<Asset>) => {
          this.assets = dataAssets;
      });
  }

}

export class AssetType {
  constructor(
    public id: number,
    public name: string) { }
}

export class Asset {
  constructor(
    public id: number,
    public name: string,
    public percent: number,
    public sum: number,
    public type: AssetType,
    public assetTypeName: string) { }
}
