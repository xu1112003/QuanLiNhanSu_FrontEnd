var dsChamCong = [
    {
        id: 166,
        name: "Nguyễn Đức Chung",
        phongban: "Phòng Kinh doanh",
        ngay: "10/06/2024",
        checkin: "7:01:20s",
        trangthai: "Muộn"
    },
    {
        id: 165,
        name: "Nguyễn Khắc Cảnh",
        phongban: "Phòng Kinh doanh",
        ngay: "10/06/2024",
        checkin: "7:00:30s",
        trangthai: "Muộn"
    },
    {
        id: 164,
        name: "Nguyễn Anh Tú",
        phongban: "Phòng Tài chính",
        ngay: "10/06/2024",
        checkin: "6:54:34s",
        trangthai: "Thành công"
    },
    {
        id: 163,
        name: "Nguyễn Tiến Đạt",
        phongban: "Phòng Kỹ thuật",
        ngay: "10/06/2024",
        checkin: "6:50:59s",
        trangthai: "Thành công"
    },
    {
        id: 162,
        name: "Nguyễn Vũ Mai Anh",
        phongban: "Phòng Kinh doanh",
        ngay: "10/06/2024",
        checkin: "6:50:18s",
        trangthai: "Thành công"
    },
    {
        id: 161,
        name: "Nguyễn Đức Chung",
        phongban: "Phòng Kinh doanh",
        ngay: "10/06/2024",
        checkin: "6:51:20s",
        trangthai: "Thành công"
    },
];
var dsKhauTru = [
    {
        STT: 1,
        ten: "Quỹ hưu trí & tử tuất",
        soTien: "8%"
    },
    {
        STT: 2,
        ten: "Quỹ bảo hiểm y tế",
        soTien: "1.5%"
    },
    {
        STT: 3,
        ten: "Quỹ bảo hiểm thất nghiệp",
        soTien: "1%"
    },
    {
        STT: 4,
        ten: "Đoàn phí công đoàn",
        soTien: "1%"
    }
];
var dsThueTNCN = [
    {
        bac: 1,
        thuNhap: "TN <= 5tr",
        thue: "TN x 5%"
    },
    {
        bac: 2,
        thuNhap: "5tr < TN <= 10tr",
        thue: "TN x 10% - 0.25tr"
    },
    {
        bac: 3,
        thuNhap: "10tr < TN <= 18tr",
        thue: "TN x 15% - 0.75tr"
    },
    {
        bac: 4,
        thuNhap: "18tr < TN <= 32tr",
        thue: "TN x 20% - 1.65tr"
    },
    {
        bac: 5,
        thuNhap: "32tr < TN <= 52tr",
        thue: "TN x 25% - 3.25tr"
    }
];
dsLuong = [
    {
        STT: 1,
        tenLoai: "Lương cơ bản",
        soTien: "6.250.000đ"
    },
    {
        STT: 2,
        tenLoai: "Lương tăng ca",
        soTien: "60.000đ/h"
    },
    {
        STT: 3,
        tenLoai: "Phụ cấp",
        soTien: "1.230.000đ"
    },
    {
        STT: 4,
        tenLoai: "Nghỉ phép",
        soTien: "30% lương theo ca"
    }
];
dsHeSoLuong = [
    {
        STT: 1,
        chucVu: "Nhân viên",
        heSo: 1
    },
    {
        STT: 2,
        chucVu: "Phó phòng",
        heSo: 1.2
    },
    {
        STT: 3,
        chucVu: "Trưởng phòng",
        heSo: 1.3
    },
    {
        STT: 4,
        chucVu: "Giám đốc",
        heSo: 1.5
    }
];
dsPhucLoi = [
    {
        STT: 1,
        ten: "Phụ cấp cơm trưa, xăng xe",
        noiDung: "1.250.000đ"
    },
    {
        STT: 2,
        ten: "Khám sức khỏe định kỳ",
        noiDung: "2 lần / năm"
    },
    {
        STT: 3,
        ten: "Thưởng KPIs",
        noiDung: "500.000đ / dự án"
    },
    {
        STT: 4,
        ten: "Du lịch nghỉ dưỡng, tổ chức team building",
        noiDung: "1 lần / năm"
    },
    {
        STT: 5,
        ten: "Tổ chức các chương trình đào tạo về kỹ năng và kiến thức chuyên môn",
        noiDung: "4 lần / năm"
    }
];
dsChuKyLuong = [
    {
        id: "1",
        header: "Payroll 5/2024",
        ngay: "Tháng 5 01 - Tháng 5 31",
        tongChiPhi: "62.612.875 đ",
        tongThucLinh: "41.190.000 đ",
        chiPhiVanHanh: "0 đ",
        doanhThu: "0 đ"
    },
    {
        id: "2",
        header: "Payroll 4/2024",
        ngay: "Tháng 5 01 - Tháng 5 31",
        tongChiPhi: "62.612.875 đ",
        tongThucLinh: "41.190.000 đ",
        chiPhiVanHanh: "0 đ",
        doanhThu: "0 đ"
    },
    {
        id: "3",
        header: "Payroll 3/2024",
        ngay: "Tháng 5 01 - Tháng 5 31",
        tongChiPhi: "62.612.875 đ",
        tongThucLinh: "41.190.000 đ",
        chiPhiVanHanh: "0 đ",
        doanhThu: "0 đ"
    },
    {
        id: "4",
        header: "Payroll 2/2024",
        ngay: "Tháng 5 01 - Tháng 5 31",
        tongChiPhi: "62.612.875 đ",
        tongThucLinh: "41.190.000 đ",
        chiPhiVanHanh: "0 đ",
        doanhThu: "0 đ"
    }
];
var dsCongViec = [
    {
        id: "CV001",
        tenCV: "Tối ưu hóa hệ thống kho hàng",
        moTa: "Cải thiện quy trình lưu kho và vận chuyển hàng hóa",
        loiNhuan: "30 triệu VND",
        trangThai: "Đã hoàn thành"
    },
    {
        id: "CV002",
        tenCV: "Phát triển ứng dụng di động",
        moTa: "Xây dựng ứng dụng di động để tăng cường trải nghiệm khách hàng",
        loiNhuan: "40 triệu VND",
        trangThai: "Đang hoàn thành"
    },
    {
        id: "CV003",
        tenCV: "Nâng cấp hệ thống thanh toán trực tuyến",
        moTa: "Nâng cấp tính năng thanh toán trực tuyến và bảo mật thông tin khách hàng",
        loiNhuan: "60 triệu VND",
        trangThai: "Đã hoàn thành"
    },
    {
        id: "CV004",
        tenCV: "Phân tích thị trường và dự báo xu hướng",
        moTa: "Tiến hành nghiên cứu thị trường và đưa ra dự báo về xu hướng tiêu dùng",
        loiNhuan: "20 triệu VND",
        trangThai: "Chưa hoàn thành"
    },
    {
        id: "CV005",
        tenCV: "Xây dựng chiến lược marketing online",
        moTa: "Phát triển chiến lược quảng cáo online để tăng doanh số bán hàng",
        loiNhuan: "35 triệu VND",
        trangThai: "Đã hoàn thành"
    }
];
var dsCongViec_ChiTiet = [
    {
        id: "NV001",
        hoTen: "Nguyễn Đức Chung",
        dongGop: "Thiết kế giao diện ứng dụng",
        moTa: "Chịu trách nhiệm thiết kế giao diện sáng tạo và dễ sử dụng cho ứng dụng di động",
        trangThai: "Đã hoàn thành"
    },
    {
        id: "NV002",
        hoTen: "Nguyễn Anh Tú",
        dongGop: "Phát triển chức năng mới",
        moTa: "Phát triển chức năng tìm kiếm nhanh cho ứng dụng di động",
        trangThai: "Đang hoàn thành"
    },
    {
        id: "NV003",
        hoTen: "Nguyễn Khắc Cảnh",
        dongGop: "Xử lý dữ liệu",
        moTa: "Xây dựng hệ thống xử lý dữ liệu cho ứng dụng di động",
        trangThai: "Đã hoàn thành"
    },
    {
        id: "NV004",
        hoTen: "Nguyễn Thúy Vy",
        dongGop: "Kiểm thử và sửa lỗi",
        moTa: "Thử nghiệm ứng dụng để phát hiện và sửa lỗi để đảm bảo chất lượng",
        trangThai: "Chưa hoàn thành"
    },
    {
        id: "NV005",
        hoTen: "Nguyễn Hữu Đức",
        dongGop: "Tối ưu hóa hiệu suất",
        moTa: "Tối ưu hóa ứng dụng để đảm bảo hoạt động mượt mà và nhanh chóng",
        trangThai: "Đã hoàn thành"
    },
    {
        id: "NV006",
        hoTen: "Nguyễn Tiến Đạt",
        dongGop: "Hỗ trợ kỹ thuật",
        moTa: "Hỗ trợ kỹ thuật cho nhóm phát triển trong quá trình triển khai ứng dụng",
        trangThai: "Đã hoàn thành"
    },
    {
        id: "NV007",
        hoTen: "Nguyễn Vũ Mai Anh",
        dongGop: "Marketing và quảng cáo",
        moTa: "Xây dựng chiến dịch marketing và quảng cáo cho ứng dụng di động",
        trangThai: "Đang hoàn thành"
    }
];
var dsLichLamViec = [
    {
        STT: 1,
        thu: "Thứ 5",
        ngay: "2024-05-02",
        sang: "Daily Meeting",
        chieu: "Client Meeting",
        toi: "Finance Meeting"
    },
    {
        STT: 2,
        thu: "Thứ 6",
        ngay: "2024-05-03",
        sang: "Daily Meeting",
        chieu: "Code Review",
        toi: ""
    },
    {
        STT: 3,
        thu: "Thứ 7",
        ngay: "2024-05-04",
        sang: "",
        chieu: "",
        toi: ""
    }
];
var dsLichLamViec_ThayDoiLich = [
    {
        STT: 1,
        ngayBatDau: "2024-05-02",
        ngayKetThuc: "2024-05-22",
        thoiGianCapNhat: "06:31:30"
    },
    {
        STT: 2,
        ngayBatDau: "2024-04-01",
        ngayKetThuc: "2024-04-30",
        thoiGianCapNhat: "15:31:20"
    },
    {
        STT: 3,
        ngayBatDau: "2024-03-01",
        ngayKetThuc: "2024-03-31",
        thoiGianCapNhat: "06:31:30"
    }
];
var dsLichLamViec_ThayDoiLich_ChiTiet = [
    {
        STT: 1,
        hoTen: "Nguyễn Thúy Vy",
        ngay: "2024-05-05",
        noiDung: "Đổi ca sáng sang ca chiều",
        lyDo: "Ốm, sốt",
        trangThai: "Chưa xác nhận"
    },
    {
        STT: 2,
        hoTen: "Nguyễn Thúy Vy",
        ngay: "2024-05-05",
        noiDung: "Đổi ca sáng sang ca chiều",
        lyDo: "Ốm, sốt",
        trangThai: "Chưa xác nhận"
    },
    {
        STT: 3,
        hoTen: "Nguyễn Tiến Đạt",
        ngay: "2024-05-04",
        noiDung: "Đổi ca sáng sang ca tối",
        lyDo: "Bận việc gia đình",
        trangThai: "Đã đồng ý"
    },
    {
        STT: 4,
        hoTen: "Nguyễn Anh Đức",
        ngay: "2024-05-20",
        noiDung: "Đổi ca sáng sang ca tối",
        lyDo: "Đi chơi",
        trangThai: "Đã từ chối"
    }
];
var ToChucPhanQuyen = [
    {
        id: "NQ001",
        tenNhom: "Admin",
        moTa: "Administrator",
        thanhVien: 3,
        nghiepVu: "Người quản trị"
    },
    {
        id: "NQ002",
        tenNhom: "IT Manager",
        moTa: "Information technology",
        thanhVien: 5,
        nghiepVu: "Nhân viên IT"
    },
    {
        id: "NQ003",
        tenNhom: "Business manager",
        moTa: "Kinh doanh",
        thanhVien: 36,
        nghiepVu: "Nhân viên kinh doanh"
    },
    {
        id: "NQ004",
        tenNhom: "Technical manager",
        moTa: "Kỹ thuật",
        thanhVien: 20,
        nghiepVu: "Nhân viên kỹ thuật"
    },
    {
        id: "NQ005",
        tenNhom: "Finance manager",
        moTa: "Tài chính",
        thanhVien: 14,
        nghiepVu: "Nhân viên tài chính"
    }
];
var NvNhomQuyen = [
    {
        id: "NV001",
        tenNV: "Nguyễn Khắc Cảnh",
        email: "canhnk@gmail.com",
        soDienThoai: "0321654987"
    },
    {
        id: "NV002",
        tenNV: "Nguyễn Đức Chung",
        email: "chungnd@gmail.com",
        soDienThoai: "0369852147"
    },
    {
        id: "NV003",
        tenNV: "Nguyễn Hữu Đức",
        email: "ducnh@gmail.com",
        soDienThoai: "0987654321"
    }

];
var dsDaTuyenDung = [
    {
        STT: 1,
        hoTenNV: "Nguyễn Khắc Cảnh",
        emailNV: "canhnk@gmail.com",
        gioiTinhNV: "Nam",
        nghiepVuNV: "Giám đốc chi nhánh",
        diaChiNV: "Bắc Ninh"
    },
    {
        STT: 2,
        hoTenNV: "Nguyễn Đức Chung",
        emailNV: "chungnd@gmail.com",
        gioiTinhNV: "Nam",
        nghiepVuNV: "Nhân viên kỹ thuật",
        diaChiNV: "Hà Nam"
    },
    {
        STT: 3,
        hoTenNV: "Nguyễn Hữu Đức",
        emailNV: "ducnh@gmail.com",
        gioiTinhNV: "Nam",
        nghiepVuNV: "Nhân viên kinh doanh",
        diaChiNV: "Hà Nội"
    },
    {
        STT: 4,
        hoTenNV: "Lê Ngọc Ánh",
        emailNV: "anhln@gmail.com",
        gioiTinhNV: "Nữ",
        nghiepVuNV: "Nhân viên tài chính",
        diaChiNV: "Bắc Giang"
    },
    {
        STT: 5,
        hoTenNV: "Nguyễn Minh Châu",
        emailNV: "chaunm@gmail.com",
        gioiTinhNV: "Nữ",
        nghiepVuNV: "Nhân viên hành chính",
        diaChiNV: "Thái Bình"
    }
];
var PheDuyetTuyenDung = [
    {
        key: 101,
        hoTen: "Đỗ Danh Khải",
        email: "khaidd@gmail.com",
        gioiTinh: "Nam",
        diaChi: "Bắc Ninh",
        nghiepVu: "Giám đốc chi nhánh",
        trangThai: "Đã duyệt"
    },
    {
        key: 102,
        hoTen: "Nguyễn Ngọc Linh",
        email: "linhnn@gmail.com",
        gioiTinh: "Nam",
        diaChi: "Hà Nam",
        nghiepVu: "Nhân viên kỹ thuật",
        trangThai: "Chưa duyệt"
    },
    {
        key: 103,
        hoTen: "Nguyễn Văn Trọng",
        email: "trongnv@gmail.com",
        gioiTinh: "Nam",
        diaChi: "Hà Nội",
        nghiepVu: "Nhân viên kinh doanh",
        trangThai: "Chưa duyệt"
    },
    {
        key: 104,
        hoTen: "Lê Thùy Linh",
        email: "linhlt@gmail.com",
        gioiTinh: "Nữ",
        diaChi: "Bắc Giang",
        nghiepVu: "Nhân viên tài chính",
        trangThai: "Đã duyệt"
    },
    {
        key: 105,
        hoTen: "Phạm Minh Thư",
        email: "thupm@gmail.com",
        gioiTinh: "Nữ",
        diaChi: "Thái Bình",
        nghiepVu: "Nhân viên hành chính",
        trangThai: "Chưa duyệt"
    }
];
var ThongTinNS = [
    {
        STT: 1,
        hoTen: "Nguyễn Khắc Cảnh",
        email: "canhnk@gmail.com",
        gioiTinh: "Nam",
        diaChi: "Bắc Ninh",
        nghiepVu: "Giám đốc chi nhánh"
    },
    {
        STT: 2,
        hoTen: "Nguyễn Đức Chung",
        email: "chungnd@gmail.com",
        gioiTinh: "Nam",
        diaChi: "Hà Nam",
        nghiepVu: "Nhân viên kỹ thuật"
    },
    {
        STT: 3,
        hoTen: "Nguyễn Hữu Đức",
        email: "ducnh@gmail.com",
        gioiTinh: "Nam",
        diaChi: "Hà Nội",
        nghiepVu: "Nhân viên kinh doanh"
    },
    {
        STT: 4,
        hoTen: "Lê Ngọc Ánh",
        email: "anhln@gmail.com",
        gioiTinh: "Nữ",
        diaChi: "Bắc Giang",
        nghiepVu: "Nhân viên tài chính"
    },
    {
        STT: 5,
        hoTen: "Nguyễn Minh Châu",
        email: "chaunm@gmail.com",
        gioiTinh: "Nữ",
        diaChi: "Thái Bình",
        nghiepVu: "Nhân viên hành chính"
    }
];
var NhanSuNghiBu = [
    {
        STTNB:1,
        hoTen:"Đào Quỳnh Chi",
        ngayBatDau:"27/05/2024",
        ngayKetThuc:"27/05/2024"
    },
    {
        STTNB:2,
        hoTen:"Nguyễn Minh Châu",
        ngayBatDau:"23/05/2024",
        ngayKetThuc:"24/05/2024"
    },
    {
        STTNB:3,
        hoTen:"Dương Văn Thái",
        ngayBatDau:"28/05/2024",
        ngayKetThuc:"28/05/2024"
    }
];
var NhanSuTangCa = [
    {
        STTTC:101,
        hoTen:"Đào Ngọc Ánh",
        ngayBatDau:"27/06/2024",
        ngayKetThuc:"27/06/2024"
    },
    {
        STTTC:102,
        hoTen:"Nguyễn Văn Long",
        ngayBatDau:"23/06/2024",
        ngayKetThuc:"24/06/2024"
    },
    {
        STTTC:103,
        hoTen:"Dương Đình Minh",
        ngayBatDau:"28/06/2024",
        ngayKetThuc:"28/06/2024"
    }
];
var MangXHNBDN = [
    {
        STT:1,
        loai:"Kỷ luật lao động",
        tieuDe: "An toàn lao động",
        noiDung:"Tất cả mọi người phải nghiêm túc tuân thủ các quy định, tiêu chuẩn về an toàn lao động. Lãnh đạo có trách nhiệm bảo đảm thực hiện trang bị bảo hiểm lao động theo quy định của pháp luật về an toàn và vệ sinh lao động, bảo vệ môi trường."
    },
    {
        STT:2,
        loai:"Trách nhiệm vật chất",
        tieuDe: "Phương thức bồi thường thiệt hại",
        noiDung:"Sẽ trừ dần vào lương hàng tháng của người lao động, mỗi lần trừ không vượt quá 30% lương tháng đó. Nếu trong thời hạn bồi thường mà người lao động có thái độ tích cực, khắc phục hậu quả do mình gây ra thì Công ty sẽ xem xét lại mức bồi thường."
    },
    {
        STT:3,
        loai:"Hành vi vi phạm kỷ luật lao động",
        tieuDe: "Các hành vi vi phạm nội quy công ty",
        noiDung:"Có hành vi trộm, tham ô và phá hoại tài sản của công ty. Vi phạm nội quy công ty về an toàn lao động và vệ sinh lao động. Vi phạm nội quy về thời gian làm việc, thời gian nghỉ ngơi của công ty. Không chấp hành yêu cầu điều hành công việc của công ty, nếu yêu cầu này đúng và không ảnh hưởng cho doanh nghiệp hay bất kỳ cá nhân nào về tài sản và tính mạng. Vi phạm quy định về bảo vệ tài sản và bí mật công nghệ của công ty."
    },
    {
        STT:4,
        loai:"Điều khoản thi hành",
        tieuDe: "Nội quy được phổ biến để có trách nhiệm thi hành nghiêm chỉnh nội quy",
        noiDung:"Nội quy công ty đóng vai trò then chốt trong việc dễ dàng quản lý, đánh giá hiệu quả công việc, xây dựng kỷ luật, nâng cao năng suất và chất lượng sản phẩm, đồng thời đảm bảo công bằng, minh bạch trong việc xử lý vi phạm. Nhìn chung, nội quy góp phần tạo dựng môi trường làm việc chuyên nghiệp, lành mạnh, thúc đẩy sự phát triển bền vững cho doanh nghiệp."
    }
];
var dsLuongNV = [
    {
        maNV: "NV001",
        hoTen:"Nguyễn Khắc Cảnh",
        phongBan:"phongBan_kt",
        chucVu:"chucVu_pp",
        ngayCong:27,
        tangCa:6,
        luong:12000000
    },
    {
        maNV: "NV002",
        hoTen:"Nguyễn Đức Chung",
        phongBan:"phongBan_kd",
        chucVu:"chucVu_ql",
        ngayCong:26,
        tangCa:8,
        luong:12500000
    },
    {
        maNV: "NV003",
        hoTen:"Nguyễn Hữu Đức",
        phongBan:"phongBan_mk",
        chucVu:"chucVu_nv",
        ngayCong:27,
        tangCa:8,
        luong:10300000
    },
];




