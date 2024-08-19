package com.app.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AddressRepository;
import com.app.dao.CartRepository;
import com.app.dao.FertilizerOrderRepository;
import com.app.dao.OrderDetailsRepository;
import com.app.dao.PaymentRepository;
import com.app.dao.UserRepository;
import com.app.dto.FertilizerOrderDto;
import com.app.entities.Address;
import com.app.entities.Cart;
import com.app.entities.FertilizerOrder;
import com.app.entities.OrderDetails;
import com.app.entities.OrderStatus;
import com.app.entities.Payment;
import com.app.entities.PaymentModes;
import com.app.entities.PaymentStatus;
import com.app.entities.User;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {
	@Autowired
	private FertilizerOrderRepository fertilizerOrderRepo;

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private AddressRepository addressRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PaymentRepository paymentRepo;

	@Autowired
	private OrderDetailsRepository orderDetailsRepo;

	@Override
	public String placeOrderForUser(int userId, int addrId, String paymentMode) {

		// get all cart items for given user
		List<Cart> cartItems = cartRepo.findAllItemsByUser(userId);

		double total = 0.0;
		int deliveryCharges = 50;
		for (Cart item : cartItems) {
			total += item.getQuantity() * item.getSelectedStock().getPrice();
		}
		
		if(total>=500) {
			deliveryCharges = 0;
		}

		Address address = addressRepo.findbyId(addrId);
		User customer = userRepo.findByUserId(userId);

		FertilizerOrder newOrder = new FertilizerOrder(total, OrderStatus.PLACED, LocalDateTime.now(), LocalDateTime.now(),
				customer, null, address);
		fertilizerOrderRepo.save(newOrder);

		Payment payment = new Payment(total + deliveryCharges,
				paymentMode.equals("COD") ? PaymentStatus.PENDING : PaymentStatus.COMPLETED, LocalDateTime.now(),
				PaymentModes.valueOf(paymentMode), newOrder);
		paymentRepo.save(payment);
		cartItems.forEach(item -> {

			orderDetailsRepo.save(new OrderDetails(item.getQuantity(), item.getSelectedStock().getPrice(), newOrder,
					item.getSelectedStock()));
		});
		cartRepo.deleteAll(cartItems);
		return "Order Placed Successfully!";
	}

	@Override
	public List<FertilizerOrderDto> getAllOrders() {
		List<FertilizerOrder> orders = fertilizerOrderRepo.findAll();
		List<FertilizerOrderDto> response = new ArrayList<>();

		for (FertilizerOrder order : orders) {
			List<OrderDetails> orderDetails = orderDetailsRepo.findAllByOrderId(order.getId());
			Payment payment = paymentRepo.findPaymentByOrderId(order.getId());
			response.add(new FertilizerOrderDto(order, orderDetails, payment));
		}
		return response;
	}

	@Override
	public List<FertilizerOrderDto> getAllPendingOrders() {
		List<FertilizerOrder> orders = fertilizerOrderRepo.findAll();
		List<FertilizerOrderDto> response = new ArrayList<>();

		for (FertilizerOrder order : orders) {
			List<OrderDetails> orderDetails = orderDetailsRepo.findAllByOrderId(order.getId());

			String s = order.getStatus().toString();

			if (s.equals("OUT_FOR_DELIVERY") || s.equals("PLACED")) {
				Payment payment = paymentRepo.findPaymentByOrderId(order.getId());
				response.add(new FertilizerOrderDto(order, orderDetails, payment));
			}
		}
		return response;
	}

	@Override
	public void updateOrderStatus(int orderId, String status, int deliveryId) {
		FertilizerOrder order = fertilizerOrderRepo.findById(orderId).get();
		order.setStatus(OrderStatus.valueOf(status));
		order.setStatusUpdateDate(LocalDateTime.now());
		User deliverBoy = userRepo.findById(deliveryId).get();
		order.setDeliverboy(deliverBoy);
		if (status.equals("DELIVERED")) {
			Payment payment = paymentRepo.findPaymentByOrderId(orderId);
			payment.setPaymentStatus(PaymentStatus.COMPLETED);
		}

	}

	@Override
	public List<FertilizerOrderDto> getMyOrders(int userId) {
		List<FertilizerOrder> orders = fertilizerOrderRepo.findAllOrdersByUserId(userId);

		List<FertilizerOrderDto> response = new ArrayList<>();

		for (FertilizerOrder order : orders) {
			List<OrderDetails> orderDetails = orderDetailsRepo.findAllByOrderId(order.getId());
			Payment payment = paymentRepo.findPaymentByOrderId(order.getId());
			response.add(new FertilizerOrderDto(order, orderDetails, payment));
		}
		return response;
	}

	@Override
	public List<FertilizerOrderDto> getAllAssignedOrders(int deliveryBoyId) {
		List<FertilizerOrder> orders = fertilizerOrderRepo.findAllOrdersByDeliverBoyId(deliveryBoyId);

		List<FertilizerOrderDto> response = new ArrayList<>();

		for (FertilizerOrder order : orders) {
			List<OrderDetails> orderDetails = orderDetailsRepo.findAllByOrderId(order.getId());
			Payment payment = paymentRepo.findPaymentByOrderId(order.getId());
			response.add(new FertilizerOrderDto(order, orderDetails, payment));
		}
		return response;
	}
}