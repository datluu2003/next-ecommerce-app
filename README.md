

# BỔ SUNG: Cấu trúc & Tính năng thực tế của folder client

## Cấu trúc thư mục chi tiết

```
client/
├── app/                # Source code Next.js (pages, components, layouts)
│   ├── cart/           # Trang giỏ hàng
│   ├── checkout/       # Trang thanh toán
│   ├── components/     # Các component dùng chung
│   ├── contexts/       # React context cho state toàn cục
│   ├── Home/           # Trang chủ
│   ├── hooks/          # Custom hooks
│   ├── order-success/  # Trang xác nhận đơn hàng
│   ├── product/        # Trang chi tiết sản phẩm
│   ├── products/       # Trang danh sách sản phẩm
│   ├── profile/        # Trang cá nhân người dùng
│   ├── providers.tsx   # Provider cho context
│   ├── Shop/           # Trang danh sách shop
│   ├── types/          # Định nghĩa kiểu dữ liệu
├── features/           # Redux features (ví dụ: cart)
├── public/             # Ảnh, tài nguyên tĩnh
├── store/              # Cấu hình Redux store
├── package.json        # Thông tin và scripts dự án
├── tailwind.config.js  # Cấu hình TailwindCSS
├── tsconfig.json       # Cấu hình TypeScript
└── README.md           # Tài liệu dự án
```

## Tính năng bổ sung

- Duyệt, tìm kiếm, lọc sản phẩm
- Quản lý giỏ hàng, thanh toán nhiều bước
- Trang chi tiết sản phẩm, thư viện ảnh
- Quản lý profile người dùng, đăng nhập
- Responsive UI cho mọi thiết bị
- Toast notification, xác thực form
- Quản lý state với Redux Toolkit

## Scripts

- `npm run dev` - Chạy server phát triển
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra code với ESLint

## Tech stack

**Frontend:** Next.js, React, TailwindCSS, Redux Toolkit, TypeScript
# Ứng Dụng Thương Mại Điện Tử Next.js

Một ứng dụng thương mại điện tử full-stack hiện đại được xây dựng với Next.js 14, TypeScript và Redux Toolkit. Cung cấp trải nghiệm mua sắm hoàn chỉnh với tính năng duyệt sản phẩm, quản lý giỏ hàng và thanh toán.

## 🚀 Tính Năng

### Tính Năng Frontend
- **Danh Mục Sản Phẩm**: Duyệt sản phẩm với chế độ xem chi tiết và thư viện hình ảnh
- **Giỏ Hàng**: Thêm/xóa sản phẩm với quản lý số lượng và lưu trữ localStorage
- **Hệ Thống Thanh Toán**: Xử lý đơn hàng hoàn chỉnh với biểu mẫu thông tin khách hàng
- **Tìm Kiếm & Lọc**: Tìm kiếm sản phẩm và lọc theo danh mục
- **Thiết Kế Responsive**: Thiết kế mobile-first với TailwindCSS
- **Thông Báo Toast**: Phản hồi người dùng với tính năng tự động ẩn và hiệu ứng mượt mà
- **Quản Lý State**: Redux Toolkit cho quản lý trạng thái toàn cục

### Backend API
- **Quản Lý Sản Phẩm**: Các thao tác CRUD cho sản phẩm và danh mục
- **Xác Thực Người Dùng**: Đăng ký và quản lý người dùng
- **Tải File**: Tích hợp Cloudinary để xử lý hình ảnh
- **Cơ Sở Dữ Liệu**: MongoDB với Mongoose ODM
- **TypeScript**: An toàn kiểu dữ liệu hoàn toàn trong ứng dụng

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Ngôn Ngữ**: TypeScript
- **Styling**: TailwindCSS
- **Quản Lý State**: Redux Toolkit
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Cơ Sở Dữ Liệu**: MongoDB
- **ODM**: Mongoose
- **Lưu Trữ File**: Cloudinary
- **Xử Lý Upload**: Multer
- **Development**: Nodemon

## 📁 Cấu Trúc Dự Án

```
├── app/                          # Thư mục app Next.js
│   ├── components/              # Components chia sẻ
│   │   ├── Header/             # Header điều hướng
│   │   ├── Footer/             # Footer trang web
│   │   ├── ProductItem/        # Component card sản phẩm
│   │   └── ProductList/        # Lưới sản phẩm
│   ├── cart/                   # Trang giỏ hàng
│   │   └── components/         # Components riêng cho giỏ hàng
│   ├── checkout/               # Quá trình thanh toán
│   │   └── components/         # Components form thanh toán
│   ├── products/               # Trang sản phẩm
│   └── Shop/                   # Trang danh sách shop
├── features/                   # Redux features
│   └── cart/                  # Quản lý state giỏ hàng
├── store/                     # Cấu hình Redux store
├── API/                       # Backend API server
│   ├── src/
│   │   ├── controllers/       # API controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   └── middlewares/      # Custom middlewares
└── public/                   # Static assets
```

## 🚀 Bắt Đầu

### Yêu Cầu Hệ Thống
- Node.js 18+ 
- npm hoặc yarn
- Cơ sở dữ liệu MongoDB
- Tài khoản Cloudinary (cho upload hình ảnh)

### Cài Đặt

1. **Clone repository**
```bash
git clone https://github.com/datluu2003/next-ecommerce-app.git
cd next-ecommerce-app
```

2. **Cài đặt dependencies cho frontend**
```bash
cd lab1
npm install
```

3. **Cài đặt dependencies cho backend**
```bash
cd ../API
npm install
```

4. **Thiết Lập Môi Trường**

Tạo `.env.local` trong thư mục `lab1`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Tạo `.env` trong thư mục `API`:
```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

### Chạy Ứng Dụng

1. **Khởi động backend server**
```bash
cd API
npm run dev
```

2. **Khởi động frontend development server**
```bash
cd lab1
npm run dev
```

3. **Mở trình duyệt**
Truy cập [http://localhost:3000](http://localhost:3000)

## 🔧 Scripts Có Sẵn

### Frontend (lab1/)
- `npm run dev` - Khởi động development server
- `npm run build` - Build cho production
- `npm run start` - Khởi động production server
- `npm run lint` - Chạy ESLint

### Backend (API/)
- `npm run dev` - Khởi động development server với nodemon
- `npm start` - Khởi động production server

## 🎯 Components Chính

### Quản Lý Giỏ Hàng
- **CartItem**: Từng item trong giỏ hàng với điều khiển số lượng
- **CartSummary**: Tính toán tổng đơn hàng
- **CartEmptyState**: Hiển thị khi giỏ hàng trống
- **CartLoadingState**: Xử lý trạng thái loading

### Quy Trình Thanh Toán
- **CustomerInfoForm**: Thu thập thông tin khách hàng
- **PaymentMethodForm**: Lựa chọn phương thức thanh toán
- **OrderSummary**: Xem lại đơn hàng cuối cùng
- **CheckoutLoadingState**: Loading trong quá trình thanh toán

### Trải Nghiệm Người Dùng
- **ConfirmToast**: Hộp thoại xác nhận với tự động ẩn (đếm ngược 5 giây)
- **Toast Notifications**: Hệ thống phản hồi thành công/lỗi
- **Responsive Design**: Layout tối ưu cho mobile

## 📱 Chi Tiết Tính Năng

### Giỏ Hàng
- Trạng thái giỏ hàng lưu trữ bằng localStorage
- Cập nhật số lượng theo thời gian thực
- Tính toán giá với định dạng tiền tệ
- Tính năng xóa sản phẩm
- Xử lý trạng thái giỏ hàng trống

### Quản Lý Sản Phẩm
- Trang chi tiết sản phẩm với thư viện hình ảnh
- Điều hướng theo danh mục
- Tính năng tìm kiếm sản phẩm
- Gợi ý sản phẩm liên quan
- Điều hướng breadcrumb

### Hệ Thống Thanh Toán
- Quy trình thanh toán nhiều bước
- Xác thực form
- Xem lại tóm tắt đơn hàng
- Lựa chọn phương thức thanh toán
- Thu thập thông tin khách hàng

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/tinh-nang-tuyet-voi`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng tuyệt vời'`)
4. Push lên branch (`git push origin feature/tinh-nang-tuyet-voi`)
5. Mở Pull Request

## 📄 Giấy Phép

Dự án này được cấp phép theo MIT License - xem file LICENSE để biết thêm chi tiết.

## 🙏 Lời Cảm Ơn

- Đội ngũ Next.js vì framework tuyệt vời
- Vercel cho nền tảng hosting và deployment
- TailwindCSS cho CSS framework utility-first
- Redux Toolkit cho quản lý state
- MongoDB cho giải pháp cơ sở dữ liệu
