import COS from 'cos-js-sdk-v5'

//* *************************************query转化为search**************************************************//

export const queryString = (jsonData) => {
	try {
		let str = ''
		for (let [k, v] of Object.entries(jsonData)) {
			str += `&${k}=${v}`
		}
		return str.slice(1)
	} catch (error) {
		return ''
	}
}
//* *************************************search转化为query对象**************************************************//
export const stringQuery = (search) => {
	if (search) {
		const str = search.slice(1)
		let obj = {}
		str.split('&').forEach((item) => {
			const k = item.split('=')[0]
			const v = item.split('=')[1]
			obj[k] = v
		})
		return obj
	}
}
//* *************************************日期格式化**************************************************//
export const dateFormat = (time, format) => {
	let dd = time ? new Date(time) : new Date()
	var o = {
		M: dd.getMonth() + 1, // 月份
		d: dd.getDate(), // 日
		h: dd.getHours(), // 小时
		H: dd.getHours(), // 小时
		m: dd.getMinutes(), // 分
		s: dd.getSeconds(), // 秒
	}
	// 年，不区分大小写
	if (/(y+)/i.test(format)) {
		// RegExp这个对象会在我们调用了正则表达式的方法后, 自动将最近一次的结果保存在里面, 所以如果我们在使用正则表达式时, 有用到分组, 那么就可以直接在调用完以后直接使用RegExp.$xx来使用捕获到的分组内容
		format = format.replace(RegExp.$1, dd.getFullYear())
	}
	for (var k in o) {
		if (new RegExp(`(${k}+)`).test(format)) {
			format = format.replace(
				RegExp.$1,
				('00' + o[k]).slice(('' + o[k]).length)
			)
		}
	}
	return format
}
//* *************************************获得本周起止时间**************************************************//
/*
  @ format: 返回时间格式 默认返回日期对象
  */
export const getCurrentWeek = (format) => {
	var currentDate = new Date() // 获取当前时间
	var week = currentDate.getDay() // 返回一周中的某一天，如周五就是5
	var millisecond = 1000 * 60 * 60 * 24 // 一天的毫秒数
	var minusDay = week !== 0 ? week - 1 : 6 // 减去的天数
	var monday = new Date(currentDate.getTime() - minusDay * millisecond) // 本周 周一
	var sunday = new Date(monday.getTime() + 6 * millisecond) // 本周 周日
	// 返回
	if (format) {
		return [monday, sunday].map((item) => dateFormat(item, format))
	}
	return [monday, sunday]
}
//* *************************************获得本月的起止时间**************************************************//
export const getCurrentMonth = (format) => {
	var startStop = [] // 起止日期数组
	var currentDate = new Date() // 获取当前时间
	var currentMonth = currentDate.getMonth() // 获得当前月份0-11
	var currentYear = currentDate.getFullYear() // 获得当前年份4位年
	var firstDay = new Date(currentYear, currentMonth, 1) // 求出本月第一天

	// 当为12月的时候年份需要加1 月份需要更新为0 也就是下一年的第一个月
	if (currentMonth === 11) {
		currentYear++
		currentMonth = 0 // 就为
	} else {
		// 否则只是月份增加,以便求的下一月的第一天
		currentMonth++
	}

	// 一天的毫秒数
	var millisecond = 1000 * 60 * 60 * 24
	// 下月的第一天
	var nextMonthDayOne = new Date(currentYear, currentMonth, 1)
	// 求出上月的最后一天
	var lastDay = new Date(nextMonthDayOne.getTime() - millisecond)

	// 添加至数组中返回
	startStop.push(firstDay)
	startStop.push(lastDay)
	// 返回
	if (format) {
		return startStop.map((item) => dateFormat(item, format))
	}
	return startStop
}
//* *************************************得到本年的起止日期**************************************************//
export const getCurrentYear = (format) => {
	// 起止日期数组
	var startStop = []
	// 获取当前时间
	var currentDate = new Date()
	// 获得当前年份4位年
	var currentYear = currentDate.getFullYear()

	// 本年第一天
	var currentYearFirstDate = new Date(currentYear, 0, 1)
	// 本年最后一天
	var currentYearLastDate = new Date(currentYear, 11, 31)
	// 添加至数组
	startStop.push(currentYearFirstDate.format('yyyy-MM-dd'))
	startStop.push(currentYearLastDate.format('yyyy-MM-dd'))
	// 返回
	if (format) {
		return startStop.map((item) => dateFormat(item, format))
	}
	return startStop
}
export const identify = (param, val) =>
	({
		string: '[object String]',
		number: '[object Number]',
		boolean: '[object Boolean]',
		array: '[object Array]',
		object: '[object Object]',
		function: '[object Function]',
		null: '[object Null]',
		undefined: '[object Undefined]',
		date: '[object Date]',
		exp: '[object RegExp]',
		promise: '[object Promise]',
		symbol: '[object Symbol]',
	}[val] === Object.prototype.toString.call(param))
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 深拷贝 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
/**
 * @param {source} object 深拷贝对象
 * @param {fileds} Any  拷贝源数据对象中的某些属性
 * **/

export const sourceCopy = (source, fileds) => {
	if (identify(source, 'array') || identify(source, 'object')) {
		let data = Array.isArray(source) ? [] : {}
		for (let [filed, value] of Object.entries(source)) {
			if (Array.isArray(fileds)) {
				//根据自定义字段进行深拷贝
				fileds.includes(filed) &&
					(data[filed] = sourceCopy(value, fileds))
			} else if (identify(fileds, 'object')) {
				//根据定义的键名做判断对深拷贝进行处理
				for (let [key, val] of Object.entries(fileds)) {
					if (key === filed) {
						if (val instanceof Function) {
							data[filed] = val(value, fileds)
						} else if (val) {
							//实行深拷贝，在不需要fileds控制
							data[filed] = sourceCopy(value)
						}
					}
				}
			} else {
				data[filed] = sourceCopy(value)
			}
		}
		return data
	} else {
		return source
	}
}

//   组装树
export const setTreeData = (data) => {
	data.forEach((item) => {
		item.children = [] // 初始化children
		data.forEach((_item, idx) => {
			// 1. 第二层push到根节点的children 2. 第三层push 到第二层根节点，由于第二层的数据是引用类型，因此之前被push到第一层的数据也会push第三层的数据 3. 最后清除不是根节点的数据就可以得到整个树
			if (item.id === _item.parentId) {
				item.children.push(_item)
			}
		})
	})
	// 清除不是根节点的树
	return data.filter((item) => !item.parentId)
}

/****************************ocs 云存储上传****************************/ 

export const uploadFun = (file) => {
	return new Promise((resolve, e) => {
		/*这部分是获取签名*/
		var cos = new COS({
			SecretId: 'AKIDtb9RUJvNZooY7REQAQilZ7PVSBfBuTIx',
			SecretKey: 'bw2sfDahYDcrs0yhAON7e2UkkV0MTKwZ',
		})
		/*这部分是腾讯提供的上传的接口*/
		cos.putObject(
			{
				Bucket: 'xiaodingyang-1300707163', //存储桶用户识别   （必须有）
				Region: 'ap-chengdu', //地区识别（必须有）
				Key: file.name, //文件名字（这里需要注意的是，如果名字是一样的，那么后面的会覆盖前面的，所以这个名字不可以重复）（必须有）
				StorageClass: 'STANDARD', // 可以不写
				Body: file, // 上传文件对象（可以不写）
				// FilePath: "/myBlog",
				onProgress: function(progressData) {},
			},
			(err, data) => {
				if (data) {
					const list = {
						name: file.name,
						uid: file.uid,
						url: 'http://' + data.Location,
                    }
                    resolve(list)
				}
				if (err) e(err)
			}
		)
	})
}

