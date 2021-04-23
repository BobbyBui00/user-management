var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

getEle("btnThem").addEventListener("click", function() {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("msnv").removeAttribute("disabled");
})

getEle("btnThemNV").addEventListener("click", function() {
    var maNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    var isValid = true;

    isValid &= validation.kiemTraRong(maNV, "tbMaNV", "(*) Vui lòng nhập mã nhân viên") && validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", "Độ dài ký tự phải từ 4 - 10", 4, 10) && validation.kiemTraTrungMa(maNV, "tbMaNV", "Mã nhân viên đã tồn tại", dsnv.arr);
    isValid &= validation.kiemTraRong(tenNV, "tbTen", "(*) Vui lòng nhập tên nhân viên") && validation.kiemTraChuoi(tenNV, "tbTen", "(*) Vui lòng nhập chuỗi");
    isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") && validation.kiemTraEmail(email, "tbEmail", "(*) Email không hợp lệ");
    isValid &= validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui lòng nhập mật khẩu");
    isValid &= validation.kiemTraRong(date, "tbNgay", "(*) Vui lòng chọn ngày tháng năm");
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ");


    if(!isValid) return;
    //Lenh return: chuong trinh se ngung chuong trinh

    var nhanVien = new NhanVien(maNV, tenNV, email, matKhau, date, chucVu);
    dsnv.themNhanVien(nhanVien);
    console.log(dsnv.arr);

    taoBang(dsnv.arr);
    setLocalStorage();
});

// function taoBang(arr) {
//     getEle("tableDanhSach").innerHTML = "";
//     for(var i = 0; i < arr.length; i++) {
//         var tagTR = createEle("tr");

//         var tagTD_maNV = createEle("td");
//         var tagTD_tenNV = createEle("td");
//         var tagTD_email = createEle("td");
//         var tagTD_date = createEle("td");
//         var tagTD_chucVu = createEle("td");

//         tagTD_maNV.innerHTML = arr[i].maNV;
//         tagTD_tenNV.innerHTML = arr[i].tenNV;tagTD_email.innerHTML = arr[i].email;tagTD_date.innerHTML = arr[i].date;tagTD_chucVu.innerHTML = arr[i].chucVu;

//         tagTR.appendChild(tagTD_maNV);
//         tagTR.appendChild(tagTD_tenNV);
//         tagTR.appendChild(tagTD_email);
//         tagTR.appendChild(tagTD_date);
//         tagTR.appendChild(tagTD_chucVu);
//         getEle("tableDanhSach").appendChild(tagTR);
//     }
// }

function taoBang(arr) {
    var content = "";
    arr.forEach(function(item) {
        //String template
        content += `
            <tr>
                <td>${item.maNV}</td>
                <td>${item.tenNV}</td>
                <td>${item.email}</td>
                <td>${item.date}</td>
                <td>${item.chucVu}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${item.maNV}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaNV('${item.maNV}')">Xoá</button>
                </td>
            </tr>
        `;
    });
    getEle("tableDanhSach").innerHTML = content;
}

/**
 * 
 * Luu mang nhan vien xuong Storage 
 */

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.arr));
} 

/**
 * Lay mang nhan vien tu Storage len su dung
 *  - Chuyen thanh kieu JSON
 */

function getLocalStorage() {
    if(localStorage.getItem("DSNV")) {
        dsnv.arr = JSON.parse(localStorage.getItem("DSNV"));
        taoBang(dsnv.arr);
    }
}

/**
 * Xoa nhan vien
 */
function xoaNV(id) {
    console.log(id);
    dsnv.xoaNhanVien(id);
    taoBang(dsnv.arr);
    setLocalStorage();
}

/**
 * Sua nhan vien
 */
function suaNV(id) {
    getEle("btnCapNhat").style.display = "block";
    getEle("btnThemNV").style.display = "none";
    var nhanVien = dsnv.layThongTinNhanVien(id);
    /**
     * DOM ra 6 o input gan value tu nhanVien da tim thay
     */
    getEle("msnv").value = nhanVien.maNV;
    getEle("msnv").setAttribute("disabled", true);
    getEle("name").value = nhanVien.tenNV;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.matKhau;
    getEle("datepicker").value = nhanVien.date;
    getEle("chucvu").value = nhanVien.chucVu;

}

    /**
     * Cap nhat nhan vien
     */
getEle("btnCapNhat").addEventListener("click", function() {
    // Lay lai thong tin tu 6 o input
    var maNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    var nhanVien = new NhanVien(maNV, tenNV, email, matKhau, date, chucVu);
    dsnv.capNhatNhanVien(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();

})

//Tim kiem nhan vien
getEle("searchName").addEventListener("keyup", function() {
    var keyWord = getEle("searchName").value;
    var mangNhanVienTimKiem = dsnv.timKiemNhanVien(keyWord);
    taoBang(mangNhanVienTimKiem);
})

function createEle (tag) {
    return document.createElement(tag);
}

function getEle(id) {
    return document.getElementById(id);
}
