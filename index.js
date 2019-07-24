// 1、第一层、第二层数据结构（默认显示一、二层，第一层要展开）
var outerData = {
  list : [
    {
      id: 1,
      spu: "spu1",
      state: "open",
      children: [
        {
          pid: 1,
          id: 11,
          spu: "spu1",
          colorId: 9,
          colorName: "红色",
          title: "2019春季新款民族宽松棉麻印...",
          state: "cloesd"
        }, {
          pid: 1,
          id: 12,
          spu: "spu1",
          colorId: 10,
          colorName: "绿色",
          title: "2019春季新款民族宽松棉麻印...",
          state: "cloesd"
        }
      ]
    },
    {
      id: 2,
      spu: "spu2",
      children: [
        {
          pid: 2,
          id: 21,
          spu: "spu2",
          colorId: 9,
          colorName: "红色",
          title: "2019春季新款民族宽松棉麻印...",
          state: "cloesd"
        }, {
          pid: 2,
          id: 22,
          spu: "spu2",
          colorId: 10,
          colorName: "绿色",
          title: "2019春季新款民族宽松棉麻印...",
          state: "cloesd"
        }
      ]
    }
  ],
  page: {
    total:100,  //  总记录数
    pageCount:10,  // 页码数
    rowCount:10,    // 每页记录条数
    fromRecord: 1,
    fromRecord: 20
  }
}

// 2、第三层数据结构（异步加载，点击展开第二层时加载）数组
var innerData = [
  {
    // --第二层的id
    "pid": 11,
    "id": 60975,
    "version": 0,
    "createTime": 1563737333,
    "createUid": "system",
    "lastEditer": "system",
    "updateTime": 1563737333,
    "urgent": 0,
    "purchaseRequiredId": 25035,
    "color": "咖啡色",
    "colorId": 100,
    "size": "37",
    "sizeId": 243,
    "spu": "WOAQDEF5",
    "sku": "WOAQDEF5DD81",
    "biSkuSaleRepositoryEntities": [
      {
        "siteName": "JFN",
        "sku": "WOAQDEF5DD81",
        "quantity_third": 0,
        "quantity_daily": 0
      }
    ],
    "hunterSkuAnalysisLevel2Entities": [
      {
        "id": 170286,
        "version": 0,
        "sku": "WOAQDEF5DD81",
        "spu": "WOAQDEF5",
        "secondCategoryId": 10066,
        "colorId": 100,
        "quantityChangeReturn": 0,
        "quantityInTravel": 1,
        "timely": "0",
        "state": "processed",
        "color": "咖啡色",

        "isDurable": 1
      },
      {
        "id": 170286,
        "version": 0,
        "sku": "WOAQDEF5DD81",
        "spu": "WOAQDEF5",
        "secondCategoryId": 10066,
        "colorId": 100,
        "quantityChangeReturn": 0,
        "quantityInTravel": 1,
        "timely": "0",
        "state": "processed",
        "color": "咖啡色",

        "isDurable": 1
      }
    ]
  },
  {
    // --第二层的id
    "pid": 11,
    "id": 60975,
    "version": 0,
    "createTime": 1563737333,
    "createUid": "system",
    "lastEditer": "system",
    "updateTime": 1563737333,
    "urgent": 0,
    "purchaseRequiredId": 25035,
    "color": "咖啡色",
    "colorId": 100,
    "size": "37",
    "sizeId": 243,
    "spu": "WOAQDEF5",
    "sku": "WOAQDEF5DD81",
    "biSkuSaleRepositoryEntities": [
      {
        "siteName": "JFN",
        "sku": "WOAQDEF5DD81",
        "quantity_third": 0,
        "quantity_daily": 0
      }
    ],
    "hunterSkuAnalysisLevel2Entities": [
      {
        "id": 170286,
        "version": 0,
        "sku": "WOAQDEF5DD81",
        "spu": "WOAQDEF5",
        "secondCategoryId": 10066,
        "colorId": 100,
        "quantityChangeReturn": 0,
        "quantityInTravel": 1,
        "timely": "0",
        "state": "processed",
        "color": "咖啡色",

        "isDurable": 1
      }, {
        "id": 170286,
        "version": 0,
        "sku": "WOAQDEF5DD81",
        "spu": "WOAQDEF5",
        "secondCategoryId": 10066,
        "colorId": 100,
        "quantityChangeReturn": 0,
        "quantityInTravel": 1,
        "timely": "0",
        "state": "processed",
        "color": "咖啡色",

        "isDurable": 1
      }
    ]
  }
];

var currentSecondId = '';  // 点击第二层展开icon, 记录secondId

$('#pagination').pagination({
  dataSource: function(done) {
    $.ajax({
      type: 'GET',
      url: 'https://api.myjson.com/bins/xpdnt',
      success: function(response) {
        done(outerData.list);
      }
    });
  },
  pageNumber: 1, // 当前页码
  pageSize: 1, // 每页显示
  showGoInput: true,
  showGoButton: true,
  beforePaging: function(pagination){
    console.log('page');
    console.log(pagination); // 页码变化
    // 请求新的数据
  },
  callback: function(data, pagination) {
    var html = renderOuterHTML(outerData.list);
    $('.shopping-list-table tbody').html(html);
  }
})

// 遍历外层
/*
* 1. 请保证函数的调用顺序, 先生成完外层html再生成第三层html
* */
// 遍历外层html
// renderOuterHTML();

// 生成外层Html(第一层第二层)
function renderOuterHTML(list) {
  var outerHTMl = ''; // 外层html(第一层第二层)

  list.forEach(function (item) {
    var children = item.children;
    outerHTMl +=
      `<tr class='first-floor' data-first-id=${item.id}>
      <td colspan="9">
        <input type="checkbox" class='checkbox-item' data-first-id=${item.id} data-spu=${ item.spu }> 
        <span class='spu-text'>SPU: ${item.spu}</span>
      </td>
    </tr>`;
    children.length > 0 && children.forEach(function (child) {
      outerHTMl +=
        `<tr class='second-floor' data-first-id=${child.pid} data-second-id=${child.id}>
          <td colspan="9">
            <span class='toggle-view-icon' data-second-id=${child.id}></span>
            <span>${child.colorName} ${child.title}</span>
          </td>
        </tr>`
    });
  });

  return outerHTMl
  // $('.shopping-list-table tbody').html(outerHTMl);
}

// 生成第三层Html, 传入实参 secondId
function renderThirdHTML(secondId) {
  currentSecondId = secondId;
  var thirdHTML = ''; // 第三层html
  innerData.forEach(function (item) {
    thirdHTML +=
      `<tr class='third-floor' data-second-id=${secondId} data-third-id=${item.id}>
        <td></td>
        <td class='v-align-m'>
          <div class='td-product'>
            <div class='product-img'>
              <img src="https://avatars0.githubusercontent.com/u/25126224?s=460&v=4" alt="" width='80'>
            </div>
            <div>
              <p>DR4QC1C54B22  <b class='color-3399FF'>S</b></p>
              <p>起订量： 5</p>
              <p>
                <span class='autonomous color-339900'>自主</span>
                <span class='doing-goods color-FF6600'>做货</span>
              </p>
            </div>
          </div>
        </td>
        <td class='v-align-m'>
          <p class='color-3399FF c-pointer'>提交采购需求</p>
          <p class='color-3399FF c-pointer'>取消采购</p>
        </td>
        <td class='v-align-m'>
          <p>建议数/需求数：40/50</p>
          <p>采购价：￥30.50</p>
          <p>缺货数：20</p>
        </td>
        <td class='v-align-m'>
          <p>预测日销量：20.0</p>
          <p>Justfasion：10/10</p>
          <p>NorClub：4/8</p>
          <p>FOURN：2/6</p>
          <span class='color-3399FF c-pointer'>查看销量统计</span>
        </td>
        <td class='v-align-m'>
          <p>广州百利甜服饰用心公司</p>
          <p class='color-FF6600'>结算：下单结算/次结</p>
        </td>
        <td class='v-align-m purchase-progress'>
          <i class='color-339900'>普通</i>
          <p>创建人：Admin  2019-05-04 11:00：01</p>
        </td>
        <td class='inner-table'>
          ${renderInnerTable()}
        </td>
        <td class='v-align-m'>
          全部仓
        </td>
      </tr>`
  })

  // 找到当前的第二层父节点
  var $secondParent = $(`.second-floor[data-second-id=${ currentSecondId }]`);
  $secondParent.after(thirdHTML);
}

// 生成第三层内嵌表格
function renderInnerTable(innerTable) {
  // innerTable 第三层内嵌表格数据
  // thirdTbody通过遍历得到
  var thirdTbody =
    `<tr>
      <td>昨天</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>-</td>
    </tr>
    <tr>
      <td>昨天</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>40</td>
      <td>-</td>
    </tr>`
  return (
    `<table class="table">
          <thead>
          <tr>
            <th>时间</th>
            <th>可用库存</th>
            <th>未审核</th>
            <th>采购中</th>
            <th>收货未入库</th>
            <th>退换货</th>
            <th>缺货数</th>
            <th>预计可用库存</th>
            <th>更多</th>
          </tr>
          </thead>
          <tbody>
            ${ thirdTbody }
          </tbody>
        </table>`
  )
}

// 第三层的展开/收起事件
$(".shopping-list-table").on("click", ".toggle-view-icon", function (e) {
  var target = $(e.currentTarget);
  // 第二层的id
  var targetSecondId = target.attr('data-second-id');
  if(target.hasClass('active')){ // 收起
    // 删除class
    target.removeClass('active');
    $(`.third-floor[data-second-id=${targetSecondId}]`).remove();
  }else{ // 展开
    target.addClass('active');
    renderThirdHTML(targetSecondId);
  }
})

// 全选/反选事件
$(".shopping-list-table").on("change", '.checkbox-all', function (e) {
  var target = $(e.currentTarget);
  // checkout勾选状态
  var checkedStatus = target.is(':checked');
  var checkboxs = $('.checkbox-item');

  for (var i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].type == "checkbox")
      checkboxs[i].checked = checkedStatus;
  }
})

// 勾选事件
$('.shopping-list-table').on('change', '.checkbox-item', function (e) {
  var target = $(e.currentTarget);
  // checkout勾选状态
  var checkedStatus = target.is(':checked');

  // 获取没选中的checkbox-item
  var unCheckedBoxs = $(".checkbox-item").not("input:checked");

  // 切换全选勾选框的勾选状态
  if(unCheckedBoxs.length > 0){
    $('.checkbox-all')[0].checked = false;
  }else {
    $('.checkbox-all')[0].checked = true;
  }
})