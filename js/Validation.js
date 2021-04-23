function Validation() {
    this.kiemTraTrungMa = function (input, spanId, mess, listArr) {
        /**
         * 0. bien co isStatus = true;
         * 1. Duyet mang listArr
         * 2. Kiem tra input === ma cua tung nhan vien 
         * 3. Neu trung
         *      isStatus = false;
         * 
         * p/s: tim hieu them ham cua javascript co ten some()
         */
        var isStatus = false;
        // Cach 1: For loop
        // for (var i = 0; i < listArr.length; i++) {
        //     if (listArr[i].maNV === input) {
        //         isStatus = true;
        //         break;
        //     }
        // }

        // Cach 2: For-each loop
        // listArr.forEach(function(item) {
        //     if(item.maNV === input) {
        //         isStatus = true;
        //     }
        // });

        // Cach 3: some()
        isStatus = listArr.some(function(item) {
            return item.maNV === input;
        })

        if (isStatus) {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = mess;
            return false;
        }

        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true;
    };


    this.kiemTraRong = function (input, spanId, mess) {
        if (input === "") {
            getEle(spanId).innerHTML = mess;
            getEle(spanId).style.display = "block";
            return false;
        } else {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }

    };

    this.kiemTraDoDaiKyTu = function (input, spanId, mess, min, max) {
        if (input.length >= min && input.length <= max) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = "block";
        return false;
    };

    this.kiemTraChuoi = function (input, spanId, mess) {
        var pattern = new RegExp(
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );
        if (pattern.test(input)) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = "block";
        return false;
    };

    this.kiemTraEmail = function (input, spanId, mess) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (mailformat.test(input)) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = "block";
        return false;
    };

    this.kiemTraChucVu = function (ele, spanId, mess) {
        if (getEle(ele).selectedIndex !== 0) {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = "block";
        return false;
    };
}