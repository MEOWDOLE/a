(function(){
    const customResponse = [
        {
            "id": "1282",
            "item": {
                "id": "1174",
                "type": "item",
                "singlePurchase": true,
                "objectSource": "curatedcontentitemtemplates",
                "objectId": "702",
                "resourceIdentifiers": [
                    {
                        "type": "name",
                        "key": "skincol_01"
                    },
                    {
                        "type": "graphics",
                        "key": "null"
                    }
                ],
                "tags": [
                    {
                        "hidden": false,
                        "id": "60",
                        "resourceIdentifiers": [
                            {
                                "type": "label",
                                "key": "TAG_BOY"
                            },
                            {
                                "type": "graphics",
                                "key": "boy"
                            }
                        ],
                        "type": "gender",
                        "gameId": "5lxc"
                    },
                    {
                        "hidden": false,
                        "id": "61",
                        "resourceIdentifiers": [
                            {
                                "type": "label",
                                "key": "TAG_GIRL"
                            },
                            {
                                "type": "graphics",
                                "key": "girl"
                            }
                        ],
                        "type": "gender",
                        "gameId": "5lxc"
                    },
                    {
                        "hidden": false,
                        "id": "64",
                        "resourceIdentifiers": [
                            {
                                "type": "label",
                                "key": "TAG_SKINCOLOR"
                            },
                            {
                                "type": "graphics",
                                "key": "skincolor"
                            }
                        ],
                        "type": "category.skincolor",
                        "gameId": "5lxc"
                    },
                    {
                        "hidden": false,
                        "id": "154",
                        "resourceIdentifiers": [
                            {
                                "type": "label",
                                "key": "TAG_BEAUTY"
                            },
                            {
                                "type": "graphics",
                                "key": "beauty"
                            }
                        ],
                        "type": "category.clothes",
                        "gameId": "5lxc",
                        "lookUpId": "tag_beauty",
                        "metadata": {}
                    }
                ],
                "lookUpId": "5a973f0b-1a87-452c-bc3c-0f811eeb6ed0",
                "additionalData": {
                    "NebulaData": {
                        "DefaultColors": "",
                        "Snapshot": "skincol_01_preview"
                    },
                    "MSP2Data": {
                        "AvatarProperty": "SkinColor",
                        "Colors": "${customSkinColor}"
                    }
                }
            },
            "shopId": "5",
            "price": {
                "currency": "soft",
                "salesPrice": 0,
                "onSale": false
            }
        }
    ];
    
    const targetUrl = 'https://eu.mspapis.com/shopinventory/v1/shops/5/listings?&page=3&pageSize=100';
    
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        const url = typeof input === 'string' ? input : input.url;
        if (url === targetUrl) {
            return Promise.resolve(new Response(JSON.stringify(customResponse), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }));
        }
        return originalFetch(input, init);
    };
    
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        this._url = url;
        return originalXHROpen.apply(this, arguments);
    };
    
    XMLHttpRequest.prototype.send = function(body) {
        if (this._url === targetUrl) {
            this.addEventListener('readystatechange', function() {
                if (this.readyState === 4) { // DONE
                    this.status = 200;
                    this.responseText = JSON.stringify(customResponse);
                    this.response = JSON.stringify(customResponse);
                }
            }, false);
        }
        return originalXHRSend.apply(this, arguments);
    };
})();
