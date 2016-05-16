<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="UTF-8" />
	<title>Unified Platform</title>
	<link rel="stylesheet" type="text/css" href="stylesheets/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="stylesheets/bootstrap-overrides.css" />
	<link rel="stylesheet" type="text/css" href="stylesheets/combiner.css" />
	<!--[if gt IE 6]>
		<link rel="stylesheet" type="text/css" href="stylesheets/internetExplorer.css" />
	<![endif]-->
	<script src="lib/less/js/less.min.js" type="text/javascript"></script>
	<script src="lib/jquery/js/jquery.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function () {
			var $timestamp = $(".timestamp");

			jQuery.fn.center = function () {
				this.css("position", "absolute");
				$timestamp.css("position", "absolute");
				this.css("left", (($(window).width() - this.outerWidth()) / 2) +
					$(window).scrollLeft() + "px");

				var top = this.css("top").replace("px", "");

				$timestamp.css("top", parseFloat(top) + parseFloat(this.height()) + 60 + "px");
				$timestamp.css("left", (($(window).width() - $timestamp.outerWidth()) / 2) + $(window).scrollLeft() + "px");
				return this;
			}

			window.onresize = function (event) {
				$("div.login-page").center();
			}

			$("div.login-page").center();

			var $form = $("#formLogin");
			var $submit = $(".submit");

			$submit.on("click", function () {
				$form.submit();
			});

			var keydown = function (e) {
				if (e.keyCode === 13) {
					$form.submit();
				}
			};

			$(".username").on("keydown", keydown);
			$(".password").on("keydown", keydown);
			$submit.on("keydown", keydown);

			var redirect = "${param.redirect}";

			if (redirect === "") {
				$("input[name=\"redirect\"]").val("<%=request.getContextPath()%>/index.html" + window.location.hash);
			} else {
				$("input[name=\"redirect\"]").val(redirect);
			}
		});
	</script>
</head>
<body class="login-body">
	<div class="container well login-page">
		<img alt="Oracle Avondale" src="img/oraclePrimaveraLogo.png" />
		<div class="row">
			<div class="span7 details">
				<div>
					<h5>Collaborative. Integrated. Intuitive. Focused. Intelligent.</h5>
					<div class="feature">
						<div class="pull-left capital-planning"></div>
						<h5>Capital Planning</h5>
						<ul>
							<li><span>Long range planning</span></li>
							<li><span>Budgeting and funding</span></li>
							<li><span>Develop and monitor Capital Plan</span></li>
						</ul>
					</div>
					<div class="feature">
						<div class="pull-left project-controls"></div>
						<h5>Project Controls</h5>
						<ul>
							<li><span>High level costing and scheduling</span></li>
							<li><span>Performance monitoring and trending</span></li>
							<li><span>Change control and auditing</span></li>
						</ul>
					</div>
					<div class="feature">
						<div class="pull-left contract-manager"></div>
						<h5>Contract Management</h5>
						<ul>
							<li><span>Contract and document administration</span></li>
							<li><span>Owner and contractor collaboration</span></li>
							<li><span>Cash flow analysis</span></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="span5 login">
				<h3>Sign in</h3>
				<form class="form-horizontal pull-left" id="formLogin" method="post" action="j_security_check">
					<div class="control-group">
						<label class="control-label">Name</label>
						<div class="controls">
							<input class="span2 input-xlarge username" type="text" name="j_username" autofocus="autofocus" tabindex="1" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Password</label>
						<div class="controls">
							<input class="span2 input-xlarge password" type="password" name="j_password" tabindex="2" />
						</div>
					</div>
					<c:choose>
						<c:when test="${param.error == \"timeout\"}"><div class="error">Session timed out. Please login again.</div></c:when>
						<c:when test="${param.error == \"login\"}"><div class="error">Invalid username and/or password.</div></c:when>
						<c:when test="${param.error == \"unspecified\"}"><div class="error">Login failed. Please contact your administrator.</div></c:when>
					</c:choose>
					<input type="hidden" name="redirect" value="" />
				</form>
				<div class="pull-left submit" tabindex="3"></div>
			</div>
		</div>
	</div>
	<footer class="timestamp">Fri Feb 08 2013 10:20:18 GMT-0500 (EST)</footer>
</body>
</html>