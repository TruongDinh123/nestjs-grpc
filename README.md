npx protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth.proto

nest generated apps auth

In general, the request lifecycle looks like the following:

1.Incoming request

2.Middleware
Globally bound middlewar
Module bound middleware

3.Guards
Global guards
Controller guards
Route guards

4.Interceptors (pre-controller)
Global interceptors
Controller interceptors
Route interceptors

5.Pipes
Global pipes
Controller pipes
Route pipes
Route parameter pipes

6.Controller (method handler)

7.Service (if exists)

8.Interceptors (post-request)
Route interceptor
Controller interceptor
Global interceptor

9.Exception filters
route
controller
global

10.Server response

11. @Controller() decorator:

- NestJS sử dụng rất nhiều decorators(Trình trang trí).
- Để đánh dấu 1 class là 1 controller.
- @Controller() decorator: Chúng ta sẽ truyền 1 optional argument cho nó.
- Ví dụ: @Controller('posts')
- Và nó hoạt động như 1 path prefix sẽ dẫn tới các routes trong controller đấy.

12. Data Transfer Object (DTO): DTO sẽ xác định kiểu dữ liệu được gửi trong 1 request.

- DTO có thể là 1 interface hoặc 1 class

13. Ưu điểm của NestJS so với Express:

- NestJS cung cấp rất nhiều thứ vượt trội hơn trong việc thiết kế API và sử dụng các controller.
- Ngược lại Express.js sẽ giúp chúng ta linh hoạt hơn không việc thiết kế API nhưng sẽ không trạng bị cho chúng ta những
  công cụ như NestJS để tăng khả năng readability of our code.
- Ưu điểm khác của NestJS là cung cấp các provides để xử lí các đối tượng Request và Response 1 cách linh hoạt như là:
  @Body() và @Params() sẽ giúp bạn improve trong việc readability of our code.

14. @Injectable() decorator sẽ cho NestJs biết rằng 1 class là 1 provider. và chúng ta có thể thêm nó vào module.

15. Module:

- Chúng ta sử dụng modules để tổ chức các ứng dụng của mình.
- Ví dụ PostControler và PostService chúng có closely related. Vì vậy chúng nên đặt trong cùng 1 module.

16. Entity:

- Entity là 1 class sẽ máp tới database table bằng cách sử dụng @Entoty() decorator

17. Repository:

- Dùng để quản lí cụ thể các entity.
- Repository nó có thể multiple các funtions và tương tác với entities bằng cách sử dụng lại TypeOrmModule

18. BaseRepositoryInterface:

- Là 1 interface mà tôi sẽ quy định các method mà một repository phải có.
- Thiết kế làm sao có thể sử dụng multiple các Database.

19. BaseRepositoryAbstract:

- Là các class được implements các method từ BaseRepositoryInterface
- Cung cấp các phương thức cơ bản cho việc tương tác với database
- Tái sử dụng mã: cung cấp các method: create, findOne, find.... Giúp giảm thiểu
  mã lặp lại trong các repository cụ thể.
- Tính trừu tượng: cho phép các class kế thừa và mở rộng mà không cần viết lại logic cơ bản

20. UsersRepositoryInterface:

- Để định nghĩa các method cho module (ví dụ: model User)
- Extend BaseRepositoryInterface
- Và là nơi viết các chức năng khác ngoài các chức năng được khai báo ở BaseRepositoryInterface

21. UsersRepository:

- UsersRepository sẽ implements UserRepositoryInterface và kế thừa các logic UsersRepositoryInterface

22. Repositorty Pattern:

- **Trách nhiệm**: Trực tiếp tương tác với cơ sở dữ liệu. Repository chịu trách nhiệm cho việc truy vấn dữ liệu và ánh xạ dữ liệu từ và đến cơ sở dữ liệu.

- **Khi nào sử dụng**: Khi bạn cần thực hiện các thao tác cơ bản liên quan đến cơ sở dữ liệu như tạo, đọc, cập nhật, và xóa (CRUD). Repository cung cấp một giao diện trừu tượng để tách biệt logic nghiệp vụ khỏi logic truy cập dữ liệu.

23. Service Pattern

- **Trách nhiệm**: Xử lý logic nghiệp vụ. Service là nơi bạn định nghĩa các quy trình và luồng xử lý dữ liệu, gọi các Repository để lấy dữ liệu và sau đó áp dụng các quy tắc nghiệp vụ.

- **Khi nào sử dụng**: Khi bạn cần thực hiện các tác vụ phức tạp hơn là chỉ truy vấn dữ liệu. Ví dụ, khi bạn cần thực hiện các tác vụ liên quan đến nhiều bảng, thực hiện các phép tính, hoặc khi bạn cần đảm bảo rằng dữ liệu đáp ứng các ràng buộc và quy tắc nghiệp vụ trước khi lưu trữ.