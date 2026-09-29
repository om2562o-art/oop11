export{}
abstract class TravelPackage {
    constructor(
        private _packageId: string,
        private _packageName: string,
        protected _basePrice: number
    ) {}

    get packageId(): string {
        return this._packageId;
    }

    get packageName(): string {
        return this._packageName;
    }

    get basePrice(): number {
        return this._basePrice;
    }

    abstract calculatePrice(people: number): number;
}

class OneDayTrip extends TravelPackage {
    constructor(packageId: string, packageName: string, basePrice: number) {
        super(packageId, packageName, basePrice);
    }

    calculatePrice(people: number): number {
        if (people >= 5) {
            return this._basePrice * people * (1 - 0.10);
        } else {
            return this._basePrice * people;
        }
    }
}

class OvernightTrip extends TravelPackage {
    constructor(
        packageId: string,
        packageName: string,
        basePrice: number,
        private _numberOfNights: number
    ) {
        super(packageId, packageName, basePrice);
    }

    get numberOfNights(): number {
        return this._numberOfNights;
    }

    calculatePrice(people: number): number {
        const total = this._basePrice * people * this._numberOfNights;
        if (this._numberOfNights >= 3) {
            return total * (1 - 0.15);
        } else {
            return total;
        }
    }
}

class Customer {
    constructor(
        private _customerId: string,
        private _name: string,
        private _phone: string
    ) {}

    get customerId(): string {
        return this._customerId;
    }

    get name(): string {
        return this._name;
    }

    get phone(): string {
        return this._phone;
    }
}

class TravelAgency {
    constructor(
        public agencyName: string,
        private packages: TravelPackage[] = []
    ) {}

    addPackage(pkg: TravelPackage): void {
        this.packages.push(pkg);
    }

    displayPackages(): void {
        console.log(`===== Travel Packages =====`);
        this.packages.forEach((pkg, index) => {
            console.log(`${index + 1}. ${pkg.packageName}`);
            console.log(`Price: ${pkg.basePrice.toFixed(2)} Baht`);
        });
    }
}

class Booking {
    private travelers: string[] = [];

    constructor(
        private bookingId: string,
        private customer: Customer,
        private travelPackage: TravelPackage
    ) {}

    addTraveler(name: string): void {
        this.travelers.push(name);
    }

    calculateTotalPrice(): number {
        return this.travelPackage.calculatePrice(this.travelers.length);
    }

    printBookingDetail(): void {
        const totalPeople = this.travelers.length;
        const totalPrice = this.calculateTotalPrice();

        console.log(`===== Booking Detail =====`);
        console.log(`Booking ID: ${this.bookingId}`);
        console.log(`Customer: ${this.customer.name}`);
        console.log(`Package: ${this.travelPackage.packageName}`);
        console.log(`Travelers: ${totalPeople} (${this.travelers.join(', ')})`);
        
        let discountText = "";
        if (this.travelPackage instanceof OneDayTrip && totalPeople >= 5) {
            discountText = " (10% Disc)";
        } else if (this.travelPackage instanceof OvernightTrip && (this.travelPackage as OvernightTrip).numberOfNights >= 3) {
            discountText = " (15% Disc)";
        }

        console.log(`Total Price${discountText}: ${totalPrice.toFixed(2)} Baht`);
    }
}

const pkg1 = new OneDayTrip("P001", "Bangkok City Tour (One-Day)", 1500);
const pkg2 = new OvernightTrip("P002", "Chiang Mai Trip (Overnight - 3 Nights)", 2500, 3);

const agency = new TravelAgency("Sunset Travel");
agency.addPackage(pkg1);
agency.addPackage(pkg2);
agency.displayPackages();

console.log("");

const customer = new Customer("C001", "สมชาย", "0812345678");
const booking = new Booking("B001", customer, pkg1);

booking.addTraveler("สมชาย");
booking.addTraveler("วันดี");
booking.addTraveler("กิตติ");
booking.addTraveler("สมหญิง");
booking.addTraveler("อำนาจ");

booking.printBookingDetail();

console.log("\nPolymorphic execution call:");
console.log(`pkg.calculatePrice(5) -> ${pkg1.calculatePrice(5)}`);