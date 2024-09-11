Cách tối ưu hiệu suất bằng index. Có 5 cách dể tối ưu hiệu suất theo đường link: [link](https://www.facebook.com/share/v/shgha5tLAxdcnZ7G/)

1. Sequential Scan:

- **Mô tả**: Quét tuần tự toàn bộ bảng, xem xét từng bản ghi để kiểm tra điều kiện lọc.

- **Khi nào sử dụng**: Thường được sử dụng khi không có chỉ mục phù hợp hoặc khi truy vấn yêu cầu một lượng lớn dữ liệu từ bảng.

- **Ưu điểm**:

  - Đơn giản và không yêu cầu chỉ mục.
  - Hiệu quả khi cần truy xuất một lượng lớn dữ liệu từ bảng.

- **Nhược điểm**:
  - Không hiệu quả cho các truy vấn cần truy cập một phần nhỏ của bảng.
  - Tốn kém về thời gian và tài nguyên khi bảng có kích thước lớn.

2. Index Scan

- **Ưu điểm**:
  - Nhanh hơn Sequential Scan khi chỉ cần một số lượng nhỏ bản ghi.
  - Cho phép truy cập trực tiếp đến bản ghi cần thiết thông qua chỉ mục.
- **Nhược điểm**:
  - Yêu cầu bảo trì chỉ mục, có thể tốn kém về không gian lưu trữ và thời gian cập nhật.
  - Không hiệu quả nếu chỉ mục không được thiết kế tốt hoặc truy vấn không tận dụng được chỉ mục.

3. Index Only Scan

- **Ưu điểm**:
  - Cực kỳ hiệu quả nếu dữ liệu cần thiết hoàn toàn có trong chỉ mục.
  - Giảm thiểu việc truy cập đĩa bằng cách không đọc bảng.
- **Nhược điểm**:
  - Chỉ hiệu quả khi các cột truy vấn nằm trong chỉ mục.
  - Yêu cầu chỉ mục phải được cập nhật thường xuyên, tốn kém tài nguyên.

4. Bitmap Scan
   - **Ưu điểm**:
     - Hiệu quả khi cần truy cập một số lượng đáng kể bản ghi.
       Giảm thiểu chi phí truy cập đĩa bằng cách sử dụng bitmap để lọc các trang dữ liệu.
   - **Nhược điểm**:
     - Không hiệu quả nếu số lượng bản ghi cần truy cập quá lớn hoặc quá nhỏ.
       Cần có chỉ mục phù hợp để tạo bitmap hiệu quả.
5. TID Scan
   - **Ưu điểm**:
   - Cực kỳ hiệu quả khi biết chính xác vị trí của bản ghi cần truy cập.
     Truy cập trực tiếp đến bản ghi mà không cần quét chỉ mục hoặc bảng.
   - **Nhược điểm**:
   - Không thực tế nếu không biết trước TID của bản ghi.
   - Hạn chế trong việc sử dụng cho các truy vấn phức tạp hoặc khi không có thông tin TID sẵn có.
