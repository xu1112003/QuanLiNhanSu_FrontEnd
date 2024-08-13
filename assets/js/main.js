
(function () {
  "use strict";
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }
  /**
 * Easy on scroll event listener 
 */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      // select('body').classList.toggle('toggle-sidebar')
      if ($(".sidebar").css("left") == "-300px") {
        $(".sidebar").css({ "left": "0px" })
        $(".content").css({ "left": "310px" })
      }
      else {
        $(".sidebar").css({ "left": "-300px" })
        $(".content").css({ "left": "10px" })
      }
    })
  }
  /**
   * Initiate Datatables
   */
  // const datatables = select('.datatable', true)
  // datatables.forEach(datatable => {
  //   new simpleDatatables.DataTable(datatable, {
  //     labels: {
  //       placeholder: "Tìm kiếm...", // Placeholder for search input
  //       perPage: "Số mục mỗi trang", // Per page dropdown
  //       noRows: "Không có dữ liệu", // Message shown when there are no matching rows
  //       info: "Hiển thị {start} đến {end} của {rows} mục" // Info text
  //     },
  //     columns: [{
  //       select: 2,
  //       sortSequence: ["desc", "asc"]
  //     },
  //     {
  //       select: 3,
  //       sortSequence: ["desc", "asc"]
  //     }
  //     ]
  //   });
  // })

})();
