from flask import Flask, request, redirect, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return "Backend running 🚀"


# 🧪 TEMPORARY browser-test route (NO POST needed)
@app.route("/test-callback")
def test_callback():
    print("✅ TEST ROUTE HIT")

    # Simulate Truecaller POST request internally
    with app.test_request_context(
        path="/truecaller/callback",
        method="POST",
        json={
            "requestId": "test-789",
            "accessToken": "dummy-token",
            "status": "success"
        }
    ):
        return truecaller_callback()


# 🔥 Actual Truecaller Callback Endpoint
@app.route("/truecaller/callback", methods=["POST"])
def truecaller_callback():
    print("✅ CALLBACK FUNCTION ENTERED")

    data = request.get_json()
    print("📩 Truecaller callback received:", data)

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    # Example expected fields
    request_id = data.get("requestId")
    access_token = data.get("accessToken")
    status = data.get("status")

    if status != "success":
        return jsonify({"error": "Verification failed"}), 400

    # TODO (later):
    # Use access_token to fetch Truecaller profile

    # Redirect user back to home page
    return redirect(
        "https://pyruvic-jennell-drumly.ngrok-free.dev/frontend/home.html"
    )


if __name__ == "__main__":
    app.run(port=5000, debug=True)
