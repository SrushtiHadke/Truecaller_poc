from flask import Flask, request, redirect, render_template, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/truecaller/callback", methods=["POST"])
def truecaller_callback():
    data = request.json
    print("Truecaller callback:", data)

    if data.get("status") != "success":
        return jsonify({"error": "Verification failed"}), 400

    return redirect("/")
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)
