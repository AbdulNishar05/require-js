define(['jquery','knockout','jqueryui'],function($,ko)
{
$(document).ready(function () {
    function Content(image, single, productId, sku, description) {
        var cur = this;
        this.image = ko.observable(image),
            this.single = ko.observable(single),
            this.productId = ko.observable(productId),
            this.sku = ko.observable(sku);
        this.input = ko.observable(1000);
        this.description = ko.observable(description);
        this.multiple = ko.computed(
            function () {
                return (Number(cur.input()) * Number(cur.single())).toFixed(2);
            }
        )
    };
    var loader = function () {
        this.rateOption = [{
            text: "0.00$ - 0.25$",
            id: '1'
        },
        {
            text: "0.25$ - 0.50$",
            id: '2'
        },
        {
            text: "0.50$ - 0.75$",
            id: '3'
        },
        {
            text: "0.75$ - 1.00$",
            id: '4'
        }
        ];
        this.sortOption = [{
            text: "Price Low - High",
            id: '1'
        }, {
            text: "Price high - Low",
            id: '2'
        }];
        this.plus = function (product) {
            product.input(Number(product.input()) + 1);
        }
        this.minus = function (product) {
            product.input(Number(product.input()) - 1);
        }


        this.first = ko.observable();
        this.second = ko.observable();

        this.load = ko.observableArray([

            "1.jpeg",
            "2.jpeg",
            "3.jpg", "4.jpg", "5.jpg"


        ])

        this.all2 = ko.observableArray([]);
        var self = this;
        this.all1 = ko.observableArray([]);
        this.imageContent = [


            "1.jpeg",
            "2.jpeg",
            "3.jpg", "4.jpg", "5.jpg",
            "6.jpg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg"

        ];
        this.Bass = function () {

            self.all1(self.all2());
            this.Pricesort = function () {
                var selectedVal = self.first();

                if (!selectedVal) {
                    return;
                }

                return self.all1().filter(function (f) {
                    if (selectedVal == 1) {

                        return f.single() >= 0.00 && f.single() < 0.25;
                    } else if (selectedVal == 2) {
                        return f.single() >= 0.25 && f.single() < 0.50;
                    } else if (selectedVal == 3) {
                        return f.single() >= 0.50 && f.single() < 0.75;
                    } else if (selectedVal == 4) {
                        return f.single() >= 0.75 && f.single() < 1.00;
                    }

                });
            }

            if ((typeof self.Pricesort() == "undefined")) {

                console.log("undefined");


                return

            };
            self.all1(self.Pricesort());
            self.pageNumber(0);

        }

        this.singleValue = [0.10, 0.25, 0.32, 0.43, 0.55, 0.66, 0.79, 0.86, 0.93, 1.00];
        this.description = [
            "18awg Electronic Wire Kit,Flexible Silicone Wire 6 Color 18 Gauge Hook Up Wire(6 different colored 13 Feet spools) 600V Stranded Wire automotive wiring",
            "Striveday 30 AWG Flexible Silicone Wire Electric wire 30 gauge Coper Hook Up Wire 300V Cables electronic stranded wire cable electrics DIY BOX-1",
            "LotFancy 22AWG Stranded Wire, 6 Colors (30 Feet Each) Electrical Wire, Tinned Copper Hookup Wire Kit 22 Gauge 300V for DIY, Flexible, PVC insulated, UL Approved",
            "22GA Hook up Wire Kit - 22AWG Silicone Wire - 600V Tinned Stranded Electrical Wire of 6 Different Colors x 23 ft each - Black, Red, Yellow, Green, Blue, White - Wire Assortment Kit from Plusivo",
            "Bryne 26 Gauge Ultra Flexible Silicone Electric Wire Kit, Stranded Tinned Copper Hook Up wire 6 Color Electronics Wire DIY Box ",
            "They are constructed with premium silicone rubber insulation.High temperature resistance 200 degree C,Low temperature resistance,in extreme cold -60 degree C.Rated Voltage: 600 volts.Outside diameter 2.3 mm,tolerance +/- 0.1 mm\
             18 gauge silicone wire spool: Black total 100 feet.",
            "EDGELEC 120pcs Breadboard Jumper Wires 10cm 15cm 20cm 30cm 40cm 50cm 100cm Optional Arduino Wire Dupont Cable Assorted Kit Male to Female Male to Male Female to Female Multicolored Ribbon Cables",
            "22GA Hook up Wire Kit - 22AWG Silicone Wire - 600V Tinned Stranded Electrical Wire of 6 Different Colors x 23 ft each - Black, Red, Yellow, Green, Blue, White - Wire Assortment Kit from Plusivo",
            "Elegoo EL-CP-004 120pcs Multicolored Dupont Wire 40pin Male to Female, 40pin Male to Male, 40pin Female to Female Breadboard Jumper Wires Ribbon Cables Kit for arduino",
            "BNTECHGO 32 AWG Magnet Wire - Enameled Copper Wire - Enameled Magnet Winding Wire - 4 oz - 0.0078' Diameter 1 Spool Coil Red Temperature Rating 155℃ Widely Used for Transformers Inductors"

        ]
        this.all = ko.observableArray(["1.jpeg",
            "2.jpeg",
            "3.jpg", "4.jpg", "5.jpg"
        ]);
        this.pageNumber = ko.observable(0);
        this.nbPerPage = 10;
        this.totalPages = ko.computed(function () {
            var div = Math.floor(self.all1().length / self.nbPerPage);
            div += self.all1().length % self.nbPerPage > 0 ? 1 : 0;
            return div - 1;
        });


        this.sort = function () {
            self.all1(self.all2());
            if (self.second() == 1) {
                function compare(a, b) {
                    if (a.single() < b.single()) {
                        return -1;
                    }
                    if (a.single() > b.single()) {
                        return 1;
                    }
                    return 0;
                }

                self.all1.sort(compare);
            } else if (self.second() == 2) {
                function compare(a, b) {
                    if (a.single() > b.single()) {
                        return -1;
                    }
                    if (a.single() < b.single()) {
                        return 1;
                    }
                    return 0;
                }

                self.all1.sort(compare);
            }



        }
        this.show = function () {
            console.log("hi");
        }
        this.printPage = function () {
            return this.pageNumber() + 1;
        }
        this.paginated = ko.computed(function () {
            var first = self.pageNumber() * self.nbPerPage;
            return self.all1.slice(first, first + self.nbPerPage);
        });
        this.hasPrevious = ko.computed(function () {
            return self.pageNumber() !== 0;
        });
        this.hasNext = ko.computed(function () {
            return self.pageNumber() !== self.totalPages();
        });
        this.next = function () {
            if (self.pageNumber() < self.totalPages()) {
                self.pageNumber(self.pageNumber() + 1);
            }
        }

        this.previous = function () {
            if (self.pageNumber() != 0) {
                self.pageNumber(self.pageNumber() - 1);
            }
        }

        this.editor = new Content(),
            this.editor.image("1.jpeg");
        this.editItem = function (item) {
            console.log(item.image());
            self.editor.image(item.image());
            self.editor.single(item.single());
            self.editor.productId(item.productId());
            self.editor.sku(item.sku());
            self.editor.input(item.input());
            self.editor.description(item.description());
            self.editor.multiple = item.multiple();

            $('#editDisplay').dialog({
                modal: true,

                minHeight: 300,
                minWidth: 700,


            });


        }
        this.giveRand = function () {
            return Math.floor(Math.random() * 10);
        }
        this.skuRand = function () {
            return Math.floor(1000 + Math.random() * 9000);
        }
        this.load = function () {

            for (let i = 0; i < 100; i++) {
                var image = self.imageContent[self.giveRand()];
                var single = self.singleValue[self.giveRand()];
                var productId = i + 1;
                var sku = self.skuRand();
                var description = self.description[self.giveRand()];
                self.all1.push(new Content(image, single, productId, sku, description));
            }
            self.all2(self.all1());


        }

        this.load();

    }

    ko.applyBindings(new loader())
})
})
