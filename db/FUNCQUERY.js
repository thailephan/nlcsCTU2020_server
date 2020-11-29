const {
    SELECT_TABLE,
    INSERT_TABLE
} = require('./QUERY')

var selectRecords = (table_name) => {
    return SELECT_TABLE + table_name
}

var insertRecords = (table_name, values) => {
    // return INSERT_TABLE + table_name + ' VALUES (' 
    //     + values.reduce(() index) => {
    //         return value
    //     }) + ')'
}

module.exports = {
    selectRecords,
}


//CTDONHANG
// SELECT [MACAYCANH]
//       ,[MADONHANG]
//       ,[SOLUONG]
//   FROM [CTDONHANG]


// INSERT INTO [CTDONHANG]
//            ([MADONHANG]
//            ,[SOLUONG])
//      VALUES
//            (<MADONHANG, int,>
//            ,<SOLUONG, tinyint,>)

//  DONHANG
// SELECT [MADONHANG]
//       ,[MATAIKHOAN]
//       ,[MATINHTRANG]
//       ,[NGAYDATHANG]
//       ,[NGAYGIAOHANG]
//       ,[TONGGIA]
//   FROM [DONHANG]


// INSERT INTO [DONHANG]
//            ([MATAIKHOAN]
//            ,[MATINHTRANG]
//            ,[NGAYDATHANG]
//            ,[NGAYGIAOHANG]
//            ,[TONGGIA])
//      VALUES
//            (<MATAIKHOAN, int,>
//            ,<MATINHTRANG, int,>
//            ,<NGAYDATHANG, datetime,>
//            ,<NGAYGIAOHANG, datetime,>
//            ,<TONGGIA, varchar(20),>)


// UPDATE [DONHANG]
// SET [MATAIKHOAN] = <MATAIKHOAN, int,>
//    ,[MATINHTRANG] = <MATINHTRANG, int,>
//    ,[NGAYDATHANG] = <NGAYDATHANG, datetime,>
//    ,[NGAYGIAOHANG] = <NGAYGIAOHANG, datetime,>
//    ,[TONGGIA] = <TONGGIA, varchar(20),>
// WHERE <Search Conditions,,>



// TTDONHANG

// SELECT [MATINHTRANG]
//       ,[TENTINHTRANG]
//   FROM [TTDONHANG]

// INSERT INTO [TTDONHANG]
//            ([TENTINHTRANG])
//      VALUES
//            (N'Đặt thành công')


// UPDATE [TTDONHANG]
//    SET [TENTINHTRANG] = <TENTINHTRANG, nvarchar(50),>
//  WHERE <Search Conditions,,>

//CAYCANH

// SELECT [MACAYCANH]
//       ,[MALOAI]
//       ,[TENCAYCANH]
//       ,[GIANIEMYET]
//       ,[MOTANGAN]
//       ,[SOCAYTON]
//       ,[MOTACHITIET]
//   FROM [CAYCANH]

//   INSERT INTO [CAYCANH]
//              ([MALOAI]
//              ,[TENCAYCANH]
//              ,[GIANIEMYET]
//              ,[MOTANGAN]
//              ,[SOCAYTON]
//              ,[MOTACHITIET])
//        VALUES
//              (<MALOAI, int,>
//              ,<TENCAYCANH, nvarchar(50),>
//              ,<GIANIEMYET, varchar(10),>
//              ,<MOTANGAN, nvarchar(200),>
//              ,<SOCAYTON, varchar(5),>
//              ,<MOTACHITIET, nvarchar(1000),>)

//UPDATE [CAYCANH]
//     SET [MALOAI] = <MALOAI, int,>
//     ,[TENCAYCANH] = <TENCAYCANH, nvarchar(50),>
//     ,[GIANIEMYET] = <GIANIEMYET, varchar(10),>
//     ,[MOTANGAN] = <MOTANGAN, nvarchar(200),>
//     ,[SOCAYTON] = <SOCAYTON, varchar(5),>
//     ,[MOTACHITIET] = <MOTACHITIET, nvarchar(1000),>
//      WHERE <Search Conditions,,>

// DELETE FROM [CAYCANH]
//       WHERE <Search Conditions,,>

//HINHANH
// SELECT [MAHINHANH]
//       ,[MACAYCANH]
//       ,[DUONGDAN]
//   FROM [HINHANH]


// INSERT INTO [HINHANH]
//            ([MACAYCANH]
//            ,[DUONGDAN])
//      VALUES
//            (<MACAYCANH, int,>
//            ,<DUONGDAN, varchar(50),>)

// UPDATE [HINHANH]
//    SET [MACAYCANH] = <MACAYCANH, int,>
//       ,[DUONGDAN] = <DUONGDAN, varchar(50),>
//  WHERE <Search Conditions,,>

// DELETE FROM [HINHANH]
//       WHERE <Search Conditions,,>



// LOAICAY
// SELECT [MALOAI]
//       ,[TENLOAI]
//   FROM [LOAICAY]

// INSERT INTO [LOAICAY]
//            ([TENLOAI])
//      VALUES
//            (<TENLOAI, nvarchar(30),>)

// UPDATE [LOAICAY]
//    SET [TENLOAI] = <TENLOAI, nvarchar(30),>
//  WHERE <Search Conditions,,>

// NGUOIDUNG
// SELECT [MAKH]
//       ,[HOTENKH]
//       ,[GIOITINH]
//       ,[NGAYSINH]
//       ,[DIACHI]
//       ,[SDT]
//   FROM [NGUOIDUNG]

// INSERT INTO [NGUOIDUNG]
//            ([HOTENKH]
//            ,[GIOITINH]
//            ,[NGAYSINH]
//            ,[DIACHI]
//            ,[SDT])
//      VALUES
//            (<HOTENKH, nvarchar(50),>
//            ,<GIOITINH, bit,>
//            ,<NGAYSINH, datetime,>
//            ,<DIACHI, nvarchar(500),>
//            ,<SDT, varchar(14),>)

// UPDATE [NGUOIDUNG]
//    SET [HOTENKH] = <HOTENKH, nvarchar(50),>
//       ,[GIOITINH] = <GIOITINH, bit,>
//       ,[NGAYSINH] = <NGAYSINH, datetime,>
//       ,[DIACHI] = <DIACHI, nvarchar(500),>
//       ,[SDT] = <SDT, varchar(14),>
//  WHERE <Search Conditions,,>

// QUYENTRUYCAP
// SELECT [MAQUYEN]
//       ,[TENQUYEN]
//   FROM [QUYENTRUYCAP]

// INSERT INTO [QUYENTRUYCAP]
//            ([TENQUYEN])
//      VALUES
//            (<TENQUYEN, nvarchar(20),>)

// UPDATE [QUYENTRUYCAP]
//    SET [TENQUYEN] = <TENQUYEN, nvarchar(20),>
//  WHERE <Search Conditions,,>

// TAIKHOAN

// SELECT [MATAIKHOAN]
//       ,[MAKH]
//       ,[MAQUYEN]
//       ,[TENTAIKHOAN]
//       ,[MATKHAU]
//       ,[ANHDAIDIEN]
//       ,[TRANGTHAI]
//   FROM [TAIKHOAN]

// INSERT INTO [TAIKHOAN]
//            ([MAKH]
//            ,[MAQUYEN]
//            ,[TENTAIKHOAN]
//            ,[MATKHAU]
//            ,[ANHDAIDIEN]
//            ,[TRANGTHAI])
//      VALUES
//            (<MAKH, int,>
//            ,<MAQUYEN, int,>
//            ,<TENTAIKHOAN, varchar(20),>
//            ,<MATKHAU, varchar(20),>
//            ,<ANHDAIDIEN, varchar(50),>
//            ,<TRANGTHAI, bit,>)

// UPDATE [TAIKHOAN]
//    SET [MAKH] = <MAKH, int,>
//       ,[MAQUYEN] = <MAQUYEN, int,>
//       ,[TENTAIKHOAN] = <TENTAIKHOAN, varchar(20),>
//       ,[MATKHAU] = <MATKHAU, varchar(20),>
//       ,[ANHDAIDIEN] = <ANHDAIDIEN, varchar(50),>
//       ,[TRANGTHAI] = <TRANGTHAI, bit,>
//  WHERE <Search Conditions,,>

// SET LAI TRANG THAI = 0 KHONG XOA NGUOI DUNG
// DELETE FROM [TAIKHOAN]
//       WHERE <Search Conditions,,>
