function DanhSachNhanVien() {
    this.arr = [];

    this.themNhanVien = function(nhanVien) {
        this.arr.push(nhanVien);
    };

    this.timViTri = function(id) {
        /**
         * Tim vi tri 
         *  - Duyet mang arr
         *  - Kiem tra item.maNV === id
         *  - Neu tim thay, lay index
         */
        //Cach 1
        // var viTri = -1;

        // this.arr.forEach(function(item, index) {
        //     if(item.maNV === id) {
        //         viTri = index;
        //     }
        // });
        // return viTri;

        //Cach 2
        return this.arr.findIndex(function(item) {
            return item.maNV === id;
        });

    };

    
    this.xoaNhanVien = function(id) {
        var index = this.timViTri(id);
        if(index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.layThongTinNhanVien = function(id) {
        /**
         *  - Tao ra bien nhanVien
         *  - Duyet mang arr, forEach()
         *  - Kiem tra item.maNV === id
         *  - Neu tim thay:
         *      => return nhanVien = item
         */
        
        //Cach 1
        // var nhanVien;
        // this.arr.forEach(function(item) {
        //     if(item.maNV === id) {
        //         nhanVien = item;
        //     }
        // })
        // return nhanVien;

        //Cach 2
        return this.arr.find(function(item) {
            return item.maNV === id;
        })
    }

    // this.capNhatNhanVien = function(nhanVien) {
        
    // }
}

DanhSachNhanVien.prototype.capNhatNhanVien = function(nhanVien) {
    var index = this.timViTri(nhanVien.maNV);
    if(index !== -1) {
        this.arr[index] = nhanVien;
    }
}

DanhSachNhanVien.prototype.timKiemNhanVien = function(keyWord) {
    /**
     * 0. Tao mangTimKiem = []
     * 1. Duyet mang arr
     * 2. Neu item.tenNV trung voi keyWord
     * 3. Them vao mangTimKiem ma Nhanvien duoc tim thay
     * 4. Tra ve mangTimKiem
     */

    //Cach 1
    // var mangTimKiem = [];
    // this.arr.forEach(function(item) {
    //     if(item.tenNV.toLowerCase().indexOf(keyWord.toLowerCase()) > -1) {
    //         mangTimKiem.push(item);
    //     }
    // })
    // return mangTimKiem;

    //Cach 2
    return this.arr.filter(function(item) {
        return item.tenNV.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
    })
}

/**
 * Ham lien quan den mang
 *  1. forEach => Duyet mang
 *  2. map => Duyet mang => Tra ve mot mang moi 
 *  2. some => Duyet mang => tra ve du lieu kieu boolean
 *  3. findIndex => Duyet mang => tra ve index
 *  4. find => Duyet mang => tra ve phan tu tim thay
 *  5. filter => Duyet mang => tra ve mang sau khi filter (Tra ve mot mang moi)
 */