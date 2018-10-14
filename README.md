# goods-display

## front-end code

### structure:
	1. jquery
	2. font-awesome
	3. select2
	4. text-editor

### main pages:
	-manage.html
	-index.html
	-detail.html
	
	-manage-main.html
	-submit.html
	-manage.html
	-login.html

### waiting to do
	-接口调试
	-响应处理
	-错误提示	

### 程序主入口
	-main.html
	-login.html

### 本地浏览
	-安装python 3.x
	-进入工程根目录
	-python -m http.server
	
	-在浏览器中打开 localhost:8000/html/main.html
		localhost:8000/html/login.html
		
## api 接口
### public 部分
	1. 商品类别信息
		查看：
		{
			url: /api/catalogs/all,
			response_data: [{'id': 'xxxx','imgUrl': 'xxxxxxx', 'title': 'xxxxxxx', 'index': 1},....],
			method: GET
		}
		注： index用于在指定该信息在前端展示的序号，取值为1,2,3,4,...
	2. 商品品牌信息
		搜索：
		{
			url: '/api/brand/all',
			query_data: {'catalogId': 'xxx'},
			response_data: [{'value': 'xxx','id': xxx}, ....],
			method: GET
		}
	3. 商品信息
		搜索：
		{
			url: '/api/goods/search',
			query_data: {'catalogId': 'xxxx', 'brandId': 'xxxx', 'page': 10},
			response_data: {data: [{'imgUrl': 'http://xxxx/images/a.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewata', 'price': '$25.4', 'goodsUrl': 'http://xxxx'},...], totalPage: 1000},
			method: GET
		}
		依据价格排序(可依价格升序降序排序，默认不排序)
		{
			url: '/api/goods/search',
			query_data: {'catalogId': 'xxx','brandId': 'xxx', 'order': 'desc', 'page': 11},
			response_data: {data: [{'imgUrl': 'http://xxxx/images/a.jpg', 'title': 'one more牛仔高腰显瘦宽松学生长裤', 'productId': 'fniewata', 'price': '$25.4', 'goodsUrl': 'http://xxxx'},...]}, totalPage: 1000},
			method: GET
		}

		注：totalPage 为商品中页数，每页目前可以按展示100个计算。
	4. 商品详情信息：
		查看：
		{
			url: '/api/goods/detail',
			query_data: {'productId': 'xxxxx'},
			response_data: {
				'title': 'xxxxxxxx',
				'generalInfo': 'xxxxxxxxxxxxxxx',
				'price': 'xxxxxxxxxxx',
				'images': ['xxxxx','xxxxx',...,'xxxxxx'],
				'realUrl': 'xxxxxxxxx',
				'description': 'ssssssssssssssssssss'
			},
			method: GET
		}

### manage 部分
	1. 登录
		登录：
		{
			url： '/api/login',
			request_data: {'username': 'xxxxx', 'password': 'xxxxxxx'},
			response_data: 
				正常流：{'msg': 'login success'}, status: 200
				异常流：{'msg': 'login failed'}, status: 400,
			method: POST
		}
		注销：
		{
			url： '/api/logout',
			request_data: {'username': 'xxxxx', 'password': 'xxxxxxx'},
			response_data: 
				正常流：{'msg': 'logout success'}, status: 200
				异常流：{'msg': 'logout failed'}, status: 400,
			method: POST
		}
	2. 商品类别信息
		查看：
			同public
		添加：
			{
				url: /api/catalogs/add,
				request_data: [{'imgUrl': 'xxxxxxx', 'title': 'xxxxxxx', 'index': 1,},....],
				response_data:
					正常流：{'msg': 'add success'}, status: 200,
					异常流：{'msg': 'xxxxxxxx'}, status: 400,
				method: POST
			}
			注，添加功能包含本地图片的上传，接口需要支持上传功能。
		修改：
		    {
				url: '/api/catalogs/edit',
				resquest_data: {'id': 'xxx', 'imgUrl': 'xxxxxx', 'title': 'xxxxxxx'},
				response_data:
					正常流： {'msg': 'update success'}, status: 200,
					异常流： {'msg': 'xxxxxxxxxxx'}, status: 400,
				method: PUT/POST
			}
		删除：
			{
				url: '/api/catalogs/delete',
				request_data: {'id': 'xxx'},
				response_data: 
					正常流： {'msg': 'delete success'}, status: 200,
					异常流： {'msg': 'xxxxxxxxxxx'}, status: 400,
				method: DELETE / GET
			}
		调整各类别显示的顺序：
			{
				url: '/api/catalogs/order'
				resquest_data: [{'id': 'xxx'}, {'id': 'yyy'},...{}],
				response_data: 
					正常流: {'msg': 'update success'}, status: 200,
					异常流：{'msg': 'xxxxxxxxxxx'}, status: 400,
				method: DELETE / GET
			}
	3. 商品信息
		依据类别查看商品列表：
			同public部分
		查看某商品详情信息：
			同public部分
		添加商品：
			{
				url: '/api/goods/edit',
				request_data:{
					'title': 'xxxxxxxx',
					'catalog': 'xxxxxxx',      
					'brand': 'xxxxxxxxxxx', 
					'generalInfo': 'xxxxxxxxxxxxxxx',
					'price': 'xxxxxxxxxxx',
					'images': ['xxxxx','xxxxx',...,'xxxxxx'],
					'realUrl': 'xxxxxxxxx',
					'description': 'ssssssssssssssssssss'
				}，
				response_data: 
					正常流: {'msg': 'update success'}, status: 200,
					异常流：{'msg': 'xxxxxxxxxxx'}, status: 400,
				method: PUT/POST
			}
		编辑商品：
			{
				url: '/api/goods/edit',
				request_data:{
					'title': 'xxxxxxxx',
					'generalInfo': 'xxxxxxxxxxxxxxx',
					'price': 'xxxxxxxxxxx',
					'images': ['xxxxx','xxxxx',...,'xxxxxx'],
					'realUrl': 'xxxxxxxxx',
					'description': 'ssssssssssssssssssss'
				}，
				response_data: 
					正常流: {'msg': 'update success'}, status: 200,
					异常流：{'msg': 'xxxxxxxxxxx'}, status: 400,
				method: PUT/POST
			}
		删除某商品：
			{
				url：'/api/goods/delete',
				request_data: {'id': 'xxxx'},
				response_data: 
					正常流: {'msg': 'delete success'}, status: 200,
					异常流：{'msg': 'xxxxxxxxxxx'}, status: 400,
				method: DELETE/GET

			}
	4. 用户管理
		个人信息查看：
			{
				url: '/api/user/userinfo',
				request_data: 无,
				response_data: {'username': 'xxxxx', id: 'xxxxxx', 'email': 'xxxxxx', 'phone': 'xxxxxxx'},
				method: GET
			}
		个人信息修改：
			{
				url: '/api/user/edit',
				request_data: {'id': 'xxxxx', 'username': 'xxxxxxxx', 'email': "xxxxxxxxxxx', 'phone': 'xxxxxxx'},
				response_data:
					正常流: {'msg': 'update success'}, status: 200,
					异常流：{'msg': 'xxxxxxxxxxx'}, status: 400,
				method: POST/PUT
			}
		密码修改：
			{
				url: '/api/password/',
				request_data: {'current':'xxxxx', 'new': 'xxxxxxxx', 'confirm': 'xxxxxxxxxxx'},
				response_data: 
					正常流: {'msg': 'update success'}, status: 200,
					异常流：{'msg': 'xxxxxxxxxxx'}, status: 400,
				method: POST/PUT
			}
	