export default async function CreatePet() {
    // const addPet = async (addPetForm: FormData) => {};
    return (
        <form>
            {/* <div className="text-xl text-orange-700">Create New Pet</div> */}
            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="name"
                >
                    Pet Name
                </label>
                <input
                    type="text"
                    required
                    id="name"
                    name="name"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="type"
                >
                    Animal Type
                </label>
                <input
                    type="text"
                    required
                    id="type"
                    name="type"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="breed"
                >
                    Breed
                </label>
                <input
                    type="text"
                    required
                    id="breed"
                    name="breed"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="gender"
                >
                    Gender
                </label>
                <input
                    type="text"
                    required
                    id="gender"
                    name="gender"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="age"
                >
                    Age
                </label>
                <input
                    type="number"
                    required
                    id="age"
                    name="age"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="health"
                >
                    Health Information
                </label>
                <input
                    type="text"
                    required
                    id="health"
                    name="health"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="vac"
                >
                    Vaccination Record
                </label>
                <input
                    type="text"
                    required
                    id="vac"
                    name="vac"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="diet"
                >
                    Dietary Preference
                </label>
                <input
                    type="text"
                    required
                    id="diet"
                    name="diet"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="behav"
                >
                    Behavioral Note
                </label>
                <input
                    type="text"
                    required
                    id="behav"
                    name="behav"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="my-2">
                <label
                    className="font-bold w-auto block text-grey-700 pr-4"
                    htmlFor="cert"
                >
                    Certificates
                </label>
                <input
                    type="text"
                    required
                    id="cert"
                    name="cert"
                    className="bg-white border-2 border-grey-200 rounded w-435 p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                />
            </div>

            <button
                type="submit"
                className="bg-gray-300 hover:bg-orange-700 p-2 rounded"
            >
                Add
            </button>
        </form>
    );
}
