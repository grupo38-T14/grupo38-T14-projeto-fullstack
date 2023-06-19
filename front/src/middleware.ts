import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const middleware = (request: NextRequest) => {
	let token = request.cookies.get("user.token");
	let url = request.url;

	if (!token && url.includes("/profile")) {
		return NextResponse.redirect(new URL("/", url));
	}
};

const config = {
	matcher: ["/", "profile"],
};
export { middleware, config };
